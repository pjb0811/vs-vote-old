import * as React from 'react';
import { Helmet } from 'react-helmet';
import TopMenu from '../organisms/menus/TopMenu';

type Props = {
  title: string;
  render: () => {};
};

class Main extends React.Component<Props> {
  render() {
    const { title, render } = this.props;
    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <TopMenu />
        <div className="ui container">{render()}</div>
      </>
    );
  }
}

export default Main;
