import * as React from 'react';
import firebase from '../../../firebase';
import { fromJS } from 'immutable';

const database = firebase.database();

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
  onVote: Function;
}

class Vote extends React.Component<Props> {

  setVote() {
    const { item, onVote, target } = this.props;
    const listRef = database.ref(`list/${item.key}`);
    const userListRef = database.ref(`users/${item.uid}/list/${item.key}`);

    const params = fromJS(item).updateIn([target, 'count'], (count: number) => count + 1);
    listRef.update(params.toJS());
    userListRef.update(params.toJS());
    onVote('once');
  }

  render() {
    const { item, target } = this.props;

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