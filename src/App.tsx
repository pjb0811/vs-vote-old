import * as React from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, Logout } from './components/pages';
import Menu from './components/Menu';
import { Helmet } from 'react-helmet';

interface Props {}

interface State {
  test: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Versus Vote</title>
        </Helmet>
        <div>
          <Menu/>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
        </div>
      </div>
    );
  }
}

export default App;
