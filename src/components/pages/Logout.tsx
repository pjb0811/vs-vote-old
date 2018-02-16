import * as React from 'react';
import firebase from '../../firebase';

interface Props {
  history: {
    push: Function;
  };
}

class Logout extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    firebase.auth().signOut().then(() => {
      const { history } = this.props;
      const location = {
        pathname: '/',
        state: {}
      };
      history.push(location);
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return null;
  }
}

export default Logout;