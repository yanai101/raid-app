import React, { useState, useEffect } from 'react';
import { fireStore } from '../firebase/config';
import { Link } from 'react-router-dom';
import { deleteUser } from "../firebase/user";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";

import {RAID_LEVEL,TECH_LEVEL} from './profile'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const Users = () => {
	const classes = useStyles();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = fireStore.collection('users');
    const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
      const users = querySnapshot.docs.map((doc) => doc.data());
      setUsers(users);
    });
    return unsubscribe;
  }, []);

	const deleteUserClick = async(id) =>{
		await deleteUser(id)
	}

  return (
    <div>
		  <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>שם</TableCell>
            <TableCell align="left">התמחות</TableCell>
            <TableCell align="left">כתובת</TableCell>
            <TableCell align="left">טלפון</TableCell>
            <TableCell align="left">אימייל</TableCell>
						<TableCell align="left">Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.uid}>
              <TableCell component="th" scope="row">
						  <Link to={`/profile/${user.uid}`}>{user.name}</Link>
              </TableCell>
              <TableCell align="left">{user.isStudent ? RAID_LEVEL[user.specialty] : TECH_LEVEL[user.specialty]}</TableCell>
              <TableCell align="left">{user.address}- {user.city}, {user.state}- {user.zip}</TableCell>
              <TableCell align="left">{user.phone}</TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="center"><Button color="secondary" onClick={()=>deleteUserClick(user.uid)}>delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default Users;
