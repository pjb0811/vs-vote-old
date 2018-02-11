import * as React from 'react';
import firebase from '../../../firebase';
import * as Firebase from 'firebase';

interface Props {
  history: any;
  type: string;
}

class AuthLogin extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      google: {
        text: 'Google Plus',
        classes: 'google plus'
      },
      facebook: {
        text: 'Facebook',
        classes: 'facebook'
      },
      github: {
        text: 'Github',
        classes: 'github'
      },
    };
  }
  
  signInWithAuth(type: string) {
    let provider: any;

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

    firebase.auth().signInWithPopup(provider).then((result) => {
      const { user } = result;
      const { history } = this.props;
      const location = {
        pathname: '/'
      };
      firebase.database().ref('users/' + user.uid).update({
        email: user.email,
        displayName: user.displayName,
      });
      history.push(location);
    });
  }
  
  render() {
    const { type } = this.props;
    const { classes, text } = this.state[type];
    return (
      <button
        type="button"
        className={`ui ${classes} button`}
        onClick={() => {
          this.signInWithAuth(type);
        }}
      >
        <i className={`${classes} icon`}/>
        {text}으로 로그인
      </button>
    );
  }
}

export default AuthLogin;