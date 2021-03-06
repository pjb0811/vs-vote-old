import * as React from 'react';
import firebase from 'firebaseApp';
import Logon from './Logon';
import Logoff from './Logoff';

interface State {
  user: object | null;
}

interface Props {
  className: string;
}

export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.setState((prevState, props) => {
        return {
          user
        };
      });
    });
  }

  render() {
    if (this.state.user) {
      return <Logon {...this.props} />;
    }
    return <Logoff {...this.props} />;
  }
}
