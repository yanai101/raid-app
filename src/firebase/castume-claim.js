var admin = require('firebase-admin');

var serviceAccount = require('../../code.json');

var uid = process.argv[2];

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-grid-dashboard-1c21a.firebaseio.com',
});

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log('custom claims set for user', uid);
    process.exit()
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  })
