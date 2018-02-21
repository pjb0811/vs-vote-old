import * as React from 'react';
import firebase from '../../firebase';
import List from '../atoms/list';

type Props = {};
type State = {
  list: Array<{
    key: string;
    detail: string;
    first: {
      file: string;
      title: string;
    },
    second: {
      file: string;
      title: string;
    }
  }>
};

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      list: [],
    };
  }
  
  componentWillMount() {
    const listRef = firebase.database().ref('list').orderByChild('date');
    listRef.once('value', (snapshot: any) => {
      snapshot.forEach((childSnapshot: any) => {
        const childData = childSnapshot.val();
        this.setState((prevState: State, props: Props) => {
          prevState.list.push(childData);
          return {
            list: prevState.list,
          };
        });
      });
    });
  }

  componentWillUnmount() {
    this.setState((prevState, props) => {
      return {
        list: []
      };
    });
  }

  render() {
    const { list } = this.state;
    return (
      <div className="ui container">
        <div className="ui segment">
          <List list={list}/>
        </div>
      </div>
    );
  }
}

export default Home;