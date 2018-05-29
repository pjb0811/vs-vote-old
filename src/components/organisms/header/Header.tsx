import * as React from 'react';

const Header = () => {
  return (
    <h2 className="ui center aligned icon header">
      <i className="hand point down outline icon" />
      <div className="content">
        VS Vote
        <div className="sub header">Vote for one of two.</div>
      </div>
    </h2>
  );
};

export default Header;
