import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles"; // v1.x
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useForm, Controller } from "react-hook-form";
import { login } from "../firebase/auth";
import Alert from "@material-ui/lab/Alert";
import { useSession } from "../firebase/userProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Login = () => {
  const classes = useStyles();
  const { control, handleSubmit, reset } = useForm();
  const [error, setError] = useState(false);
  const { user } = useSession();

  const onSubmit = async (data) => {
    setError(false);
    try {
      await login(data);
      reset();
    } catch (error) {
      setError(error.message);
    }
  };

  if (user) {
    return <h2>Hello {user.displayName} Welcome back!</h2>;
  }

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField placeholder="Enter your email" type="email" name="email" error={!!error} label="email" value={value} onChange={onChange} />
        )}
        rules={{ required: "Email required" }}
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
      <Button type="Submit" color="primary" style={style}>
        login
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
};

const style = {
  margin: 15,
};
export default Login;
