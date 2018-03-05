import * as React from 'react';
import List from './List';

interface Props {}

class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui segment">
          <List />
        </div>
      </div>
    );
  }
}

export default Home;