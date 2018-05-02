import * as React from 'react';

const Error = (props: any) => {
  return (
    <div className="ui negative message">
      {/* <div className="header">요청 중 에러가 발생하였습니다.</div> */}
      <p>{props.message}</p>
    </div>
  );
};

export default Error;
