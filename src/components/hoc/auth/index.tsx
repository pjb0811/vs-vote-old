import * as React from 'react';
import Login from '../../pages/Login';
import firebase from '../../../firebase';

interface State {
  user: object | null;
}

export default (WrappedComponent: any) => {
  return class extends React.Component<any, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        user: {}
      };
    }

    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        this.setState((prevState, props) => {
          return {
            user
          };
        });
      });
    }

    render() {
      const { user } = this.state;
      if (!user) {
        return <Login {...this.props} />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};
