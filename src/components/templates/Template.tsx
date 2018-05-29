import * as React from 'react';
import { Helmet } from 'react-helmet';
import TopMenu from '../organisms/menus/TopMenu';

export default (params: { title: string; WrappedComponent: any }) => {
  return class Template extends React.Component {
    render() {
      const { WrappedComponent, title } = params;
      return (
        <>
          <Helmet>
            <title>{title}</title>
          </Helmet>
          <TopMenu />
          <div className="ui container">
            <WrappedComponent {...this.props} />
          </div>
        </>
      );
    }
  };
};
