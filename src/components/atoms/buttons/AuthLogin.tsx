import * as React from 'react';

interface Props {
  type: string;
  signInWithAuth?: Function;
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

  render() {
    const { type, signInWithAuth } = this.props;
    const { classes, text } = this.state[type];
    return (
      <button
        type="button"
        className={`ui ${classes} button`}
        onClick={() => {
          if (typeof signInWithAuth === 'function') {
            signInWithAuth(type);
          }
        }}
      >
        <i className={`${classes} icon`}/>
        {text}
      </button>
    );
  }
}

export default AuthLogin;