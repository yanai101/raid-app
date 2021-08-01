import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MenuAppBar from "./components/appBer";
import { UserProvider, useSession } from "./firebase/userProvider";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import Horses from "./pages/horses";
import Users from "./pages/users";
import HorsesList from "./pages/horsesList";
import calendarPage from "./pages/calendarPage";



import RedirectRoute from "./router/redirectRoute";
import AdminRoute from "./router/adminRoute";

export default function AppRouter() {
  return (
    <UserProvider>
      <Router>
        <div>
          <MenuAppBar />
          <main style={{padding:'20px'}}>
            <Switch>
              <RedirectRoute exact path="/about" component={About} />
              <Route exact path="/signup" component={Signup} />
              <RedirectRoute exact path="/profile" component={Profile} />
              <RedirectRoute exact path="/profile/:id" component={Profile} />
              <AdminRoute exact path="/Users" component={Users} />
              <RedirectRoute exact path="/horses/:id" component={Horses} />
              <RedirectRoute exact path="/horses" component={Horses} />
              <RedirectRoute exact path="/horsesList" component={HorsesList} />
              <RedirectRoute exact path="/calender" component={calendarPage} />

              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

function About() {
  const { user } = useSession();
  return <h2>About {JSON.stringify(user, null, 2)}</h2>;
}

