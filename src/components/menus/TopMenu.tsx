import * as React from 'react';
import { NavLink } from 'react-router-dom';
import LinkGroup from '../atoms/menus/LinkGroup';

class TopMenu extends React.Component {
  render() {
    return (
      <div className="ui top fixed menu">
        <NavLink exact={true} to="/" className="item" activeClassName="active">VS 투표하기</NavLink>
        <LinkGroup className="ui item"/>
      </div>
    );
  }
}

export default TopMenu;