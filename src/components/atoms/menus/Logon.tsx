import * as React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from '../../../firebase';
// import { Dropdown } from 'semantic-ui-react';

interface Props {
  className: string;
}

const Logon = (props: Props) => {
  const { className } = props;
  const user = firebase.auth().currentUser;
  let uid: string | undefined = '';

  if (user) {
    uid = user.uid;
  }

  return (
    <div className="right menu">
      {/*
      <Dropdown className="item" text="메뉴">
        <Dropdown.Menu>
          <NavLink to={`/list/${uid}`} className={className} activeClassName="active">나의 VS 목록</NavLink>
          <NavLink to="/post" className={className} activeClassName="active">VS 등록하기</NavLink>
        </Dropdown.Menu>
      </Dropdown>
      */}
      <NavLink to={`/list/${uid}`} className={className} activeClassName="active">My List</NavLink>
      <NavLink to="/post" className={className} activeClassName="active">Post</NavLink>
      <NavLink to="/logout" className={className} activeClassName="active">Logout</NavLink>
    </div>
  );
};

export default Logon;