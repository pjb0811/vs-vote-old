import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCeq1vCAwhiO9Bpj7op3KPpQqRyc1pcaZM',
  authDomain: 'versus-vote.firebaseapp.com',
  databaseURL: 'https://versus-vote.firebaseio.com',
  projectId: 'versus-vote',
  storageBucket: 'versus-vote.appspot.com',
  messagingSenderId: '283112969857'
};

const app = firebase.initializeApp(config);

export default app;