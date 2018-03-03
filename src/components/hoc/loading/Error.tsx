import * as React from 'react';

const Error = () => {
  return (
    <div className="ui negative message">
      <div className="header">
        요청 중 에러가 발생하였습니다.
      </div>
      <p>잠시 후 다시 접속 부탁드립니다.</p>
    </div>
  );
};

export default Error;