import * as React from 'react';
import firebase from '../../../firebase';
import { fromJS } from 'immutable';

interface Props {
  item: {
    key: string;
    detail: string;
    first: {
      file: string;
      title: string;
      count: number;
    },
    second: {
      file: string;
      title: string;
      count: number;
    }
    uid: string;
  };
  target: string;
}

class Vote extends React.Component<Props> {
  state = {
    ...this.props,
  };

  setVote() {
    const { item, target } = this.props;
    const database = firebase.database();
    const listRef = database.ref(`list/${item.key}`);
    const userListRef = database.ref(`users/${item.uid}/list/${item.key}`);

    const params = fromJS(item).updateIn([target, 'count'], (count: number) => count + 1);
    listRef.update(params.toJS());
    userListRef.update(params.toJS());
  }

  render() {
    const { item, target } = this.state;
    return (
      <div
        className="ui animated fade button teal basic"
        onClick={() => { this.setVote(); }}
      >
        <div className="visible content">{item[target].count} Voted</div>
        <div className="hidden content">click!</div>
      </div>
    );
  }
}

export default Vote;