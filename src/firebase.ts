import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAy874uE0fPqGkGbwXOhdBedX-ikghp954',
  authDomain: 'vs-vote.firebaseapp.com',
  databaseURL: 'https://vs-vote.firebaseio.com',
  projectId: 'vs-vote',
  storageBucket: 'vs-vote.appspot.com',
  messagingSenderId: '748019287867'
};

const app = firebase.initializeApp(config);

export default app;