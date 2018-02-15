
import * as React from 'react';
import firebase from '../../../firebase';
import Logout from './Logout';
import Login from './Login';

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

  componentDidMount() {
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
      return <Logout {...this.props}/>;
    }
    return <Login {...this.props}/>;
  }
}