import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  className: string;
}

const Login = (props: Props) => {
  const { className } = props;
  return (
    <div>
      <NavLink to="/login" className={className} activeClassName="active">Login</NavLink>
      <NavLink to="/signup" className={className} activeClassName="active">Sign Up</NavLink>
    </div>
  );
};

export default Login;