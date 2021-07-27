import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import logo from "../images/logo.jpg";
import Navigation from "./navigation";
import { useSession } from "../firebase/userProvider";
import { logOut } from "../firebase/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const { user , isAdmin} = useSession();
  const history = useHistory();

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutUser = async (user) => {
    await logOut();
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon /> */}
            <img src={logo} width="50" height="50" alt="logo" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Navigation />
          </Typography>
          {auth && (
            <div>
              {user ? user.displayName : ""}
              <IconButton aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                {user && <MenuItem onClick={() => history.replace(`/profile/${user.uid}`)}>My account</MenuItem>}
                {user && <MenuItem onClick={logOutUser}>Logout</MenuItem>}
                {isAdmin && <MenuItem onClick={() => history.replace("/Users")}>Users</MenuItem>}
                {isAdmin && <MenuItem onClick={() => history.replace("/profile")}>Add user</MenuItem>}
                {isAdmin && <MenuItem onClick={() => history.replace("/horses")}>Add horses</MenuItem>}
                {!user && <MenuItem onClick={() => history.replace("/signup")}>Signup</MenuItem>}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
