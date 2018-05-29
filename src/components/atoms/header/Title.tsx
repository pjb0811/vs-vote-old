import * as React from 'react';

const Title = (props: { title: string }) => {
  const { title } = props;
  return <h3>{title}</h3>;
};

export default Title;
