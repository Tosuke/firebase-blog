import * as firebase from 'firebase-admin'

if (process.env.FUNCTION_NAME) {
  // run in function
  firebase.initializeApp()
} else {
  firebase.initializeApp({
    credential: firebase.credential.cert(require('../.firebase/service-account.json')),
    storageBucket: process.env.firebaseStorageBucket
  })
}

export default firebase