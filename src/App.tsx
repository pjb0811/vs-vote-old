import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Home,
  Login,
  Logout,
  SignUp,
  List,
  Post,
  ResetPassword
} from './components/pages';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact={true} path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/signup" component={SignUp} />
        <Route path="/resetPassword" component={ResetPassword} />
        <Switch>
          <Route path="/list/:uid" component={List} />
          <Route path="/list" component={List} />
        </Switch>
        <Route path="/post" component={Post} />
      </div>
    );
  }
}

export default App;
