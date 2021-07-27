
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { fireStore } from "../firebase/config";
import { updateHorseDocument , addHorse } from "../firebase/horse";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@material-ui/core";
import ProfileImage from "../components/profileImage";


function Horses() {

	const params = useParams();
  const { setValue, handleSubmit, control } = useForm();
  const [userDocument, setUserDocument] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const history =useHistory();

	useEffect(() => {
    const docRef = fireStore.collection("horses").doc(params.id);

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
  }, [params.id]);

	const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result =params.id ? await updateHorseDocument({ uid: params.id, ...data }) : await addHorse(data);
      if(result && !params.id){
        history.replace(`/horses/${result}`)
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
		<div>
			<h2>Horses</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ width: "150px" }}>
          {params.id && <ProfileImage id={params.id} isHorse={true} />}
        </div>
        <div className="form-group">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field, fieldState: { error } }) => <TextField {...field} placeholder="user name" type="text" name="שם הסוס" error={!!error} label="שם מלא" />}
          rules={{ required: "name required" }}
        />
				</div>
				<Button type="submit" variant="contained" className="ui submit large grey button right floated">
          שלח
        </Button>
				</form>
			
		</div>
	)
}

export default Horses


