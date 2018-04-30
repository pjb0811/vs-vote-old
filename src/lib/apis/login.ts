import firebase from '../../firebase';
import * as Firebase from 'firebase';

function checkLogin(params: { email: string; password: string }) {
  const { email, password } = params;
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

function checkSignInWithAuth(params: { type: string }) {
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
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(
        result => {
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
        error => {
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
