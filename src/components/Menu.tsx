import * as React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/test">test</Link></li>
        <li><Link to="/counter">counter</Link></li>
      </ul>
      <hr/>
    </div>
  );
};

export default Menu;