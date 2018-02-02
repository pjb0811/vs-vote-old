import * as React from 'react';
import { NavLink } from 'react-router-dom';
import buttonGroup from './hoc/auth/buttonGroup';
import Login from './hoc/auth/Login';

const AuthButtonGroup = buttonGroup(Login);

class Menu extends React.Component {
  render() {
    return (
      <div className="ui menu">
        <NavLink exact={true} to="/" className="item" activeClassName="active">Versus Vote</NavLink>
        {/* <NavLink exact={true} to="/list" className="item" activeClassName="active">List</NavLink>
        <NavLink exact={true} to="/edit" className="item" activeClassName="active">Edit</NavLink> */}
        <AuthButtonGroup className="item"/>
      </div>
    );
  }
}

export default Menu;