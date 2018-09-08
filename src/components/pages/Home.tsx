import * as React from 'react';
import { Main as MainTemplate } from '../templates';
import { Header, List } from '../organisms';

class Home extends React.Component {
  render() {
    return (
      <MainTemplate
        title={'Home'}
        render={() => {
          return (
            <div>
              <Header />
              <List />
            </div>
          );
        }}
      />
    );
  }
}

export default Home;
