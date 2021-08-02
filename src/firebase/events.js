import { fireStore } from "./config";


export const addEvent = async (data) => {
	const uid = await fireStore.collection('events').doc().id;
	const docRef = fireStore.doc(`/events/${uid}`);
 	await docRef.set({uid,...data});
	return uid
}

export const createEventDocument = async (event) => {
  // get a reference to the Firestore document
  const docRef = fireStore.doc(`/events/${event.uid}`);
  // write to Cloud Firestore
  return docRef.set({...event});
};

export const updateEventDocument = async (event) => {
  const docRef = fireStore.doc(`/events/${event.uid}`);
  return docRef.update(event);
};

export const deleteEvent = async (id) => {
  const docRef = fireStore.doc(`/events/${id}`);
  return docRef.delete();
};
