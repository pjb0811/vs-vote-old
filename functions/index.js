'use strict';
const functions = require('firebase-functions');
const server = require('./build-server/server.js');
exports.app = functions.https.onRequest(server);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
