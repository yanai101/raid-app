import { Route, Redirect } from "react-router-dom";
import { useSession } from "../firebase/userProvider";

function RedirectRoute({ component: Component, ...rest }) {
  const { user, isAdmin } = useSession();
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: isAdmin ? '/users': `/`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default RedirectRoute;
