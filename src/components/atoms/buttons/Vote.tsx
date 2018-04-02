import * as React from 'react';
import firebase from '../../../firebase';

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
    const params = {
      [target]: {
        count: item[target].count + 1,
      }
    };
    itemRef.update(params);
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