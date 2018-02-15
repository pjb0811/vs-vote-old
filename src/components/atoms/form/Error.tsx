import * as React from 'react';

interface Props {
  errors: object;
  touched: object;
  field: string;
}

export default (props: Props) => {
  const { errors, touched, field } = props;
  if (errors[field] && touched[field]) {
    return (
      <div className="ui error message">
        <p>{errors[field]}</p>
      </div>
    );
  }

  return null;
};