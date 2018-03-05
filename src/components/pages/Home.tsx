import * as React from 'react';
import List from './List';

interface Props {}

class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 className="ui center aligned icon header">
          <i className="hand point down outline icon"/>
          <div className="content">
            VS Vote
            <div className="sub header">Vote for one of two.</div>
          </div>
        </h2>
        <List/>
      </div>
    );
  }
}

export default Home;