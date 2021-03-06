import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  className: string;
}

const Logoff = (props: Props) => {
  const { className } = props;
  return (
    <div className="right menu">
      <NavLink to="/login" className={className} activeClassName="active">Login</NavLink>
      <NavLink to="/signup" className={className} activeClassName="active">Sign Up</NavLink>
    </div>
  );
};

export default Logoff;