import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <div className="ui three item menu">
        <NavLink exact={true} to="/" className="item" activeClassName="active">Home</NavLink>
        <NavLink to="/about" className="item" activeClassName="active">About</NavLink>
        <NavLink to="/counter" className="item" activeClassName="active">counter</NavLink>
      </div>
    </div>
  );
};

export default Menu;