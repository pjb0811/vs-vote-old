import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Home, Login, Logout, SignUp, List, Post,
  ResetPassword,
} from './components/pages';
import TopMenu from './components/menus/TopMenu';
import { Helmet } from 'react-helmet';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>VS Vote</title>
        </Helmet>
        <TopMenu/>
        <div className="ui container">
          <Route exact={true} path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/signup" component={SignUp}/>
          <Route path="/resetPassword" component={ResetPassword}/>
          <Switch>
            <Route path="/list/:uid" component={List}/>
            <Route path="/list" component={List}/>
          </Switch>
          <Route path="/post" component={Post}/>
        </div>
      </div>
    );
  }
}

export default App;
