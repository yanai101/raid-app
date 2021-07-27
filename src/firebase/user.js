import { fireStore, storage } from "./config";

export const createUserDocument = async (user) => {
  // get a reference to the Firestore document
  const docRef = fireStore.doc(`/users/${user.uid}`);

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
  return docRef.set({...user});
};

export const addUser = async (data) => {
	const uid = await fireStore.collection('users').doc().id;
	const docRef = fireStore.doc(`/users/${uid}`);
 	await docRef.set({uid,...data});
	return uid
}

export const updateUserDocument = async (user) => {
  const docRef = fireStore.doc(`/users/${user.uid}`);
  return docRef.update(user);
};

export const deleteUser = async (id) => {
  const docRef = fireStore.doc(`/users/${id}`);
  return docRef.delete();
};

export const uploadUserImg = async (userId, file, progress, cb) => {
  const filePath = `users/${userId}/profile-image`;
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

export const getProfileImage = (id) => {
  const filePath = `users/${id}/profile-image`;
  return storage.ref().child(filePath).getDownloadURL();
};

