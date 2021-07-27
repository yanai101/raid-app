import { fireStore, storage } from "./config";

export const createHorseDocument = async (horse) => {
  // get a reference to the Firestore document
  const docRef = fireStore.doc(`/horses/${horse.uid}`);

  // create user object
  // const userProfile = {
  //   uid: user.uid,
  //   email: user.email,
  //   name: user.displayName,
  //   address: "",
  //   city: "",
  //   state: "",
  //   zip: "",
  //   phone: "",
  //   specialty: "",
  //   ip: "",
  // };
  // write to Cloud Firestore
  return docRef.set({...horse});
};

export const addHorse = async (data) => {
	const uid = await fireStore.collection('horses').doc().id;
	const docRef = fireStore.doc(`/horses/${uid}`);
 	await docRef.set({uid,...data});
	return uid
}

export const updateHorseDocument = async (horse) => {
  const docRef = fireStore.doc(`/horses/${horse.uid}`);
  return docRef.update(horse);
};

export const deleteHorse = async (id) => {
  const docRef = fireStore.doc(`/horses/${id}`);
  return docRef.delete();
};

export const uploadHorseImg = async (horseId, file, progress, cb) => {
  const filePath = `horses/${horseId}/profile-image`;
  const fileRef = storage.ref().child(filePath);
  // upload file
  const uploadTask = fileRef.put(file);
  uploadTask.on(
    "state_change",
    (snapshot) => progress(snapshot),
    (error) => {
      throw new Error(error);
    },
    async () => {
      if (cb) {
        const url = await uploadTask.snapshot.ref.getDownloadURL();
        console.log(url);
        cb(url);
      } else {
        return uploadTask.snapshot.ref.getDownloadURL();
      }
    }
  );
};

export const getHorseProfileImage = (id) => {
  const filePath = `horses/${id}/profile-image`;
  return storage.ref().child(filePath).getDownloadURL();
};

