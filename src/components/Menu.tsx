import * as React from 'react';
import { NavLink } from 'react-router-dom';
import buttonGroup from './hoc/auth/buttonGroup';
import Login from './hoc/auth/Login';

const AuthButtonGroup = buttonGroup(Login);

class Menu extends React.Component {
  render() {
    return (
      <div className="ui menu">
        <NavLink exact={true} to="/" className="item" activeClassName="active">VS 투표하기</NavLink>
        <AuthButtonGroup className="ui item"/>
      </div>
    );
  }
}

export default Menu;