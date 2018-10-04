const functions = require('firebase-functions')

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.render = functions.region('us-central1').https.onRequest((req, res) => {
  const handler = require('./render')
  handler(req, res)
})
