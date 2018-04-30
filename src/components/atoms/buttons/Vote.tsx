import * as React from 'react';
import { Props } from '../../../interface/atoms/buttons/Vote';

class Vote extends React.Component<Props> {
  setVote() {
    const { onVote } = this.props;
    onVote();
  }

  render() {
    const { item, target } = this.props;

    return (
      <div
        className="ui animated fade button teal basic"
        onClick={() => {
          this.setVote();
        }}
      >
        <div className="visible content">{item[target].count} Voted</div>
        <div className="hidden content">click!</div>
      </div>
    );
  }
}

export default Vote;
