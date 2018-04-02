import * as React from 'react';

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
    console.log('vote!');
  }

  render() {
    const { item, target } = this.props;
    return (
      <div
        className="ui animated fade button teal basic"
        onClick={this.setVote}
      >
        <div className="visible content">{item[target].count} Voted</div>
        <div className="hidden content">click!</div>
      </div>
    );
  }
}

export default Vote;