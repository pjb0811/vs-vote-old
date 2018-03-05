import * as React from 'react';
import { Route } from 'react-router-dom';
import {
  Home, Login, Logout, SignUp, MyPage, List, Edit, Counter,
  ResetPassword,
} from './components/pages';
import TopMenu from './components/menus/TopMenu';
import { Helmet } from 'react-helmet';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <title>Versus Vote</title>
        </Helmet>
        <TopMenu/>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/myPage" component={MyPage}/>
        <Route path="/list" component={List}/>
        <Route path="/post" component={Edit}/>
        <Route path="/resetPassword" component={ResetPassword}/>
        <Route path="/counter" component={Counter}/>
      </div>
    );
  }
}

export default App;
