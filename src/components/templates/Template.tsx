import * as React from 'react';
import { Helmet } from 'react-helmet';
import TopMenu from '../organisms/menus/TopMenu';

class Template extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>VS Vote</title>
        </Helmet>
        <TopMenu />
        <div className="ui container">pages...</div>
      </div>
    );
  }
}

export default Template;
