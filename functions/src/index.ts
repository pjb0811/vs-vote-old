import * as functions from 'firebase-functions';
import * as server from '../../src/server';
export const app = functions.https.onRequest(server as any);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
