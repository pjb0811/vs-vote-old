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
  }

  componentWillMount() {
    firebase.auth().signOut().then(() => {
      const { history } = this.props;
      const location = {
        pathname: '/',
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