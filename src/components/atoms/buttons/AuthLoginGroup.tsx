import * as React from 'react';
import firebase from '../../../firebase';
import * as Firebase from 'firebase';
import Alert from '../modals/Alert';
import Loader from '../loader';

interface Props {
  history: {
    push: Function;
  };
  className: string;
}

interface State {
  loader: boolean;
  alert: {
    message: string;
    open: boolean;
    type: string;
  };
}

class AuthLoginGroup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loader: false,
      alert: {
        message: '',
        open: false,
        type: ''
      }
    };
  }

  signInWithAuth(type: string) {
    let provider: Firebase.auth.GoogleAuthProvider | undefined;

    this.setState((prevState, props) => {
      return {
        ...prevState,
        loader: true
      };
    });

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
            const { history } = this.props;
            const location = {
              pathname: '/'
            };
            firebase
              .database()
              .ref('users/' + user.uid)
              .update({
                email: user.email,
                displayName: user.displayName
              });
            history.push(location);
          },
          error => {
            this.setState((prevState, props) => {
              return {
                loader: false,
                alert: {
                  message: error.message,
                  open: true,
                  type: 'error'
                }
              };
            });
          }
        );
    }
  }

  render() {
    const { className, children } = this.props;
    const { alert, loader } = this.state;
    const childrenWithProps = React.Children.map(
      children,
      (child: React.ReactElement<any>) => {
        return React.cloneElement(child, {
          ...child.props,
          signInWithAuth: this.signInWithAuth.bind(this)
        });
      }
    );

    return (
      <div>
        {loader && <Loader />}
        <div className={className}>
          {childrenWithProps}
          <Alert
            message={alert.message}
            open={alert.open}
            type={alert.type}
            onClose={() => {
              this.setState((prevState, props) => {
                return {
                  ...prevState,
                  alert: {
                    ...prevState.alert,
                    open: false
                  }
                };
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default AuthLoginGroup;
