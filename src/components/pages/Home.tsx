import * as React from 'react';
import Template from '../templates';
import Header from '../organisms/header';
import List from '../organisms/list';

class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <List />
      </div>
    );
  }
}

export default Template({
  title: 'Home',
  WrappedComponent: Home
});
