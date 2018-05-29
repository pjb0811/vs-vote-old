import * as React from 'react';
import { NavLink } from 'react-router-dom';
import LinkGroup from 'components/molecules/menus/LinkGroup';

class TopMenu extends React.Component {
  render() {
    return (
      <div className="ui top fixed menu">
        <NavLink exact={true} to="/" className="item" activeClassName="active">
          Home
        </NavLink>
        <LinkGroup className="ui item" />
      </div>
    );
  }
}

export default TopMenu;
