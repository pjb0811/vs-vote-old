import * as React from 'react';
import { NavLink } from 'react-router-dom';
// import { Dropdown } from 'semantic-ui-react';

interface Props {
  className: string;
}

const Logon = (props: Props) => {
  const { className } = props;
  return (
    <div className="right menu">
      <NavLink to="/edit" className={className} activeClassName="active">VS 등록하기</NavLink>
      {/* <Dropdown className="item" text="마이 페이지">
        <Dropdown.Menu>
          <NavLink to="/mypage" className={className} activeClassName="active">비밀번호 확인</NavLink>
        </Dropdown.Menu>
      </Dropdown> */}
      <NavLink to="/logout" className={className} activeClassName="active">로그아웃</NavLink>
    </div>
  );
};

export default Logon;