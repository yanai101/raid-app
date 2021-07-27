import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import EventIcon from "@material-ui/icons/Event";
import GroupIcon from "@material-ui/icons/Group";
import PetsIcon from '@material-ui/icons/Pets';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 500,
    display: "flex",
  },
  a: {
    display: "block",
    width: "100%",
  },
});

export default function Navigation() {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        history.push(`/${newValue}`);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction value="home" label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction value="calendar" label="Calendar" icon={<EventIcon />} />
      <BottomNavigationAction value="users" label="Users" icon={<GroupIcon />} />
      <BottomNavigationAction value="horsesList" label="Horses List" icon={<PetsIcon />} />
    </BottomNavigation>
  );
}
