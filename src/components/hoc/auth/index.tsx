
import * as React from 'react';
import Login from '../../pages/Login';
import firebase from '../../../firebase';

export default (WrappedComponent: any) => {
  return class extends React.Component<any> {
    render() {
      const user = firebase.auth().currentUser;
      if (!user) {
        return <Login {...this.props}/>;
      }
      return <WrappedComponent {...this.props}/>;
    }
  };
};