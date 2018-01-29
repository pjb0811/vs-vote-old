
import * as React from 'react';
import firebase from '../../../firebase';
import Logout from './Logout';

interface State {
  authenticated: boolean;
}

export default (WrappedComponent: any) => {
  return class extends React.Component<any, State> {
    constructor(props: any) {
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
      return <WrappedComponent {...this.props}/>;
    }
  };
};