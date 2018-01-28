import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../App';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import store from '../redux/store';

const render = async (location: string) => {
  const helmet = Helmet.renderStatic();
  const context = {};

  const html = await ReactDOMServer.renderToString(
    <StaticRouter location={location} context={context}>
      <Provider store={store}>
        <App/>
      </Provider>
    </StaticRouter>
  );

  return {
    html,
    state: store.getState(),
    helmet,
  };
};

export default render;