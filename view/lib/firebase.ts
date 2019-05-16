import _firebase from 'firebase/app'

function initFirebase() {
  if (!_firebase.apps.length) {
    _firebase.initializeApp({
      apiKey: process.env.firebaseAPIKey,
      authDomain: process.env.firebaseAuthDomain,
      databaseURL: process.env.firebaseDatabaseURL,
      projectId: process.env.firebaseProjectID,
      storageBucket: process.env.firebaseStorageBucket,
      messagingSenderId: process.env.firebaseMessagingSenderID,
    })
  }
  return _firebase
}

export const firebase = initFirebase()

async function loadFirestore() {
  await import('firebase/firestore')
  return _firebase.firestore()
}
export const willBeFirestore = loadFirestore()
