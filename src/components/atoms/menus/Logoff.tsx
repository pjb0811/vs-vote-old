import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  className: string;
}

const Logoff = (props: Props) => {
  const { className } = props;
  return (
    <div className="right menu">
      <NavLink to="/login" className={className} activeClassName="active">로그인</NavLink>
      <NavLink to="/signup" className={className} activeClassName="active">회원가입</NavLink>
    </div>
  );
};

export default Logoff;