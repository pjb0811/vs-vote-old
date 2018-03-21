import * as React from 'react';

interface Props {
  count: number;
}

class Vote extends React.Component<Props> {
  setVote() {
    console.log('vote!');
  }

  render() {
    const { count } = this.props;
    return (
      <div
        className="ui animated fade button teal basic"
        onClick={() => {
          this.setVote();
        }}
      >
        <div className="visible content">{count} Voted</div>
        <div className="hidden content">click!</div>
      </div>
    );
  }
}

export default Vote;