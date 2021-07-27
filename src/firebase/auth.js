import firebase from "firebase";
import { createUserDocument } from './user';


export const singUp = async ({ email, firstName, password }) => {
  const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password);
  await user.updateProfile({ displayName: firstName });
  createUserDocument(user);
  return user
};


export const logOut = ()=>{
  return firebase.auth().signOut();
}

export const login = async({email, password})=>{
  const {user} = await firebase.auth().signInWithEmailAndPassword(email, password);
  return user;
}