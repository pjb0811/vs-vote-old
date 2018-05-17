import firebase from 'firebaseApp';
import * as Firebase from 'firebase';

async function checkLogin(params: { email: string; password: string }) {
  const { email, password } = params;
  let data = {
    success: false,
    isVerifing: false,
    message: ''
  };
  await firebase
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
  let provider: Firebase.auth.GoogleAuthProvider | undefined;
  let data = {
    success: true,
    message: ''
  };

  if (type === 'google') {
    provider = new Firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }
  if (type === 'facebook') {
    provider = new Firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
  }
  if (type === 'github') {
    provider = new Firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
  }

  if (provider) {
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(
        (result: any) => {
          const { user } = result;
          firebase
            .database()
            .ref('users/' + user.uid)
            .update({
              email: user.email,
              displayName: user.displayName
            });
          data.success = true;
        },
        (error: any) => {
          data.success = false;
          data.message = error.message;
        }
      );
  }
  return {
    data
  };
}

export default { checkLogin, checkSignInWithAuth };
