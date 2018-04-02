import * as React from 'react';
import firebase from '../../../firebase';
import { Map } from 'immutable';

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
  setVote() {
    const { item, target } = this.props;
    const database = firebase.database();
    const itemRef = database.ref(`list/${item.key}`);
    /* const params = {
      ...item,
      [target]: {
        ...item[target],
        count: item[target].count + 1,
      }
    }; */

    const params = Map(item);
    params.setIn(['first', 'count'], (count: number) => count + 1);

    console.debug(target, itemRef);
    console.log(params.toJS());
    // itemRef.update(params);
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