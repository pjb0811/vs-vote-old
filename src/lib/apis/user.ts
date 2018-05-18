import firebaseApp from 'firebaseApp';
import * as firebase from 'firebase';

async function checkLogin(params: { email: string; password: string }) {
  const { email, password } = params;
  let data = {
    success: false,
    isVerifing: false,
    message: ''
  };
  await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      (user: any) => {
        data.success = true;
      },
      (error: any) => {
        data.success = false;
        data.message = error.message;
        data.isVerifing = true;
      }
    );

  return {
    data
  };
}

async function checkSignInWithAuth(params: { type: string }) {
  const { type } = params;
  let provider: any;
  let database: any = firebaseApp.firestore();

  let data = {
    success: false,
    isVerifing: false,
    message: ''
  };

  if (type === 'google') {
    provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }
  if (type === 'facebook') {
    provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
  }
  if (type === 'github') {
    provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
  }

  await firebaseApp
    .auth()
    .signInWithPopup(provider)
    .then(
      async (result: any) => {
        const { user } = result;
        await database
          .collection('users')
          .doc(user.uid)
          .set({
            email: user.email,
            displayName: user.displayName
          });
        data.success = true;
      },
      (error: any) => {
        data.success = false;
        data.message = error.message;
        data.isVerifing = true;
      }
    );

  return {
    data
  };
}

export default { checkLogin, checkSignInWithAuth };
