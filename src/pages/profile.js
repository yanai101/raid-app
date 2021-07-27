import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSession } from "../firebase/userProvider";
import { fireStore } from "../firebase/config";
import { updateUserDocument,addUser } from "../firebase/user";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller , useWatch} from "react-hook-form";
import { Button } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Switch from '@material-ui/core/Switch';


import ProfileImage from "../components/profileImage";
import './profile.scss';

export const RAID_LEVEL = {
  1: 'הליכה',
  2: 'טרוט',
  3: 'קנטור'
}

export const TECH_LEVEL = {
  1: 'טיפולי',
  2: 'ספורט',
  3: 'ספורט + טיפולי'
}

const Profile = () => {
  const { user } = useSession();
  const params = useParams();
  const { setValue, handleSubmit, control } = useForm();
  const [userDocument, setUserDocument] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const history =useHistory();

  const isStudent = useWatch({
    control,
    name: 'isStudent', // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: false // default value before the render
  });

  useEffect(() => {
    const docRef = fireStore.collection("users").doc(params.id);

    /**
     * without live subscribe
     * */

    // docRef.get().then((documentData)=>{
    //   if(documentData){
    //     setUserDocument(documentData);
    //   }
    // })
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserDocument(documentData);
      }
    });
    return unsubscribe;
  }, [user.uid, params.id]);

  useEffect(() => {
    if (userDocument) {
      Object.entries(userDocument).forEach((entry) => {
        setValue(entry[0], entry[1]);
      });
    }
  }, [userDocument, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result =params.id ? await updateUserDocument({ uid: params.id, ...data }) : await addUser(data);
      if(result && !params.id){
        history.replace(`/profile/${result}`)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="profile" style={{ maxWidth: 960, margin: "50px auto" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: "150px" }}>
          {params.id && <ProfileImage id={params.id} />}
          {/* {JSON.stringify(control,null,2)} */}
        </div>
        <div className="form-group">
          <Controller
            name="isStudent"
            control={control}
            defaultValue=""
            render={({ field, fieldState: { error } }) =>( 
              <p>תלמיד  
              <Switch
                {...field}
                checked={field.value}
                color="primary"
                name="isStudent"
                inputProps={{ 'aria-label': 'primary checkbox' }}
          />מורה</p>)}
        />
      
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => <TextField {...field} placeholder="user name" type="text" name="name" error={!!error} label="שם מלא" />}
          rules={{ required: "name required" }}
        />
        <Controller
          name="email"
          defaultValue=""
          control={control}
          render={({ field, fieldState: { error } }) => <TextField {...field} placeholder="Enter your email" type="email" name="email" error={!!error} label="אימייל" />}
          rules={{ required: "Email required" }}
        />

        <Controller
          name="address"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => <TextField placeholder="Enter your email" name="address" error={!!error} label="כתובת" {...field} />}
          rules={{ required: "address required" }}
        />
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => <TextField placeholder="Enter your email" name="city" error={!!error} label="עיר" {...field} />}
          rules={{ required: "city required" }}
        />
       
        {isStudent ?<Controller
          name="specialty"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => (
            <FormControl error={!!error}>
              <InputLabel htmlFor="age-native-simple">רמת רכיבה</InputLabel>
              <Select
                native
                {...field}
                inputProps={{
                  name: "רמה",
                }}
              >
                <option aria-label="None" value="" />
                <option value={1}>{RAID_LEVEL["1"]}</option>
                <option value={2}>{RAID_LEVEL["2"]}</option>
                <option value={3}>{RAID_LEVEL["3"]}</option>
              </Select>
              {!!error && <FormHelperText>{error.message}</FormHelperText>}
            </FormControl>
          )}
          rules={{ required: "specialty required" }}
        /> : <Controller
        name="specialty"
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <FormControl error={!!error}>
            <InputLabel htmlFor="age-native-simple">התמחות</InputLabel>
            <Select
              native
              {...field}
              inputProps={{
                name: "רמה",
              }}
            >
              <option aria-label="None" value="" />
              <option value="1">{TECH_LEVEL[1]}</option>
              <option value="2">{TECH_LEVEL[2]}</option>
              <option value="3">{TECH_LEVEL[3]}</option>
            </Select>
            {!!error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
        rules={{ required: "specialty required" }}
      />}
      
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => <TextField placeholder="Enter your email" name="phone" error={!!error} label="טלפון" {...field} />}
          rules={{ required: "phone required" }}
        />
        </div>
        <Button type="submit" variant="contained" className="ui submit large grey button right floated">
          שלח
        </Button>
      </form>
    </div>
  );
};

export default Profile;
