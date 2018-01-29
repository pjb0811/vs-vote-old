import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <div className="ui menu">
      <NavLink exact={true} to="/" className="item" activeClassName="active">Home</NavLink>
      {/*
      <NavLink to="/about" className="item" activeClassName="active">About</NavLink>
      <NavLink to="/counter" className="item" activeClassName="active">counter</NavLink>
      */}
    </div>
  );
};

export default Menu;