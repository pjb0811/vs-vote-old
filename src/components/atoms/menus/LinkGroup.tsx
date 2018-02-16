
import * as React from 'react';
import firebase from '../../../firebase';
import Logon from './Logon';
import Logoff from './Logoff';

interface State {
  authenticated: boolean;
}

interface Props {
  className: string;
}

export default class extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      authenticated: false,
    };
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState((prevState, props) => {
        return {
          authenticated: !!user,
        };
      });
    });
  }

  render() {
    if (this.state.authenticated) {
      return <Logon {...this.props}/>;
    }
    return <Logoff {...this.props}/>;
  }
}