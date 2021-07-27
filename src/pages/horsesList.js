import React, { useState, useEffect } from 'react';
import { fireStore } from '../firebase/config';
import { Link } from 'react-router-dom';
import { deleteHorse } from "../firebase/horse";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const HorsesList = () => {
	const classes = useStyles();

  const [horses, setHorses] = useState([]);

  useEffect(() => {
    const usersRef = fireStore.collection('horses');
    const unsubscribe = usersRef.onSnapshot((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      setHorses(data);
    });
    return unsubscribe;
  }, []);

	const deleteHorseClick = async(id) =>{
		await deleteHorse(id);
	}

  return (
    <div>
		  <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>שם</TableCell>
						<TableCell align="left">Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {horses.map((horse) => (
            <TableRow key={horse.uid}>
              <TableCell component="th" scope="row">
						  <Link to={`/horses/${horse.uid}`}>{horse.name}</Link>
              </TableCell>
              <TableCell align="center"><Button color="secondary" onClick={()=>deleteHorseClick(horse.uid)}>delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default HorsesList;
