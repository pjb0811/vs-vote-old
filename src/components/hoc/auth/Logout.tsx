import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Logout = (props: any) => {
  const { className } = props;
  return (
    <div className="right menu">
      <NavLink to="/logout" className={className} activeClassName="active">Logout</NavLink>
    </div>
  );
};

export default Logout;