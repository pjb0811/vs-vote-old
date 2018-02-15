import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {
  className: string;
}

const Logout = (props: Props) => {
  const { className } = props;
  return (
    <div className="right menu">
      <NavLink to="/edit" className={className} activeClassName="active">VS 등록하기</NavLink>
      <NavLink to="/logout" className={className} activeClassName="active">로그아웃</NavLink>
    </div>
  );
};

export default Logout;