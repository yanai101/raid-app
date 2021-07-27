import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles"; // v1.x
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";
import { singUp } from "../firebase/auth";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Signup = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      setLoading(true);
      await singUp(data);
      reset();
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      {loading ? (
        <span>'Loading...'</span>
      ) : (
        <>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField placeholder="Enter your Username" name="username" error={!!error} label="Username" value={value} onChange={onChange} />
            )}
            rules={{ required: "First name required" }}
          />
          <br />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField placeholder="Enter your email" type="email" error={!!error} name="email" label="email" value={value} onChange={onChange} />
            )}
            rules={{ required: "First name required" }}
          />
          <br />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField type="password" placeholder="Enter your Password" error={!!error} name="password" label="Password" value={value} onChange={onChange} />
            )}
            rules={{ required: "First name required" }}
          />
          <br />
          {error && <Alert severity="error">{error}</Alert>}

          <Button type="Submit" color="primary" style={style}>
            SingUp
          </Button>
        </>
      )}
    </form>
  );
};

const style = {
  margin: 15,
};
export default Signup;
