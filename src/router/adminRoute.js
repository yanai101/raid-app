import { Route, Redirect } from 'react-router-dom';
import { useSession } from '../firebase/userProvider';

const AdminRoute = ({ component: Component, ...rest }) => {
  const { user, isAdmin } = useSession();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!!user && isAdmin) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default AdminRoute;
