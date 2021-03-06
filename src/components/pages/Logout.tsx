import * as React from 'react';
import firebase from 'firebaseApp';
import { Props } from '../../interface/pages/Logout';

class Logout extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const { history } = this.props;
        const location = {
          pathname: '/'
        };
        history.push(location);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  render() {
    return null;
  }
}

export default Logout;
