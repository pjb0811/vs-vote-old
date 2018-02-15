
import * as React from 'react';
import Pending from './Pending';
import Error from './Error';

export default (WrappedComponent: any) => {
  return class extends React.Component<any> {
    render() {
      if (this.props.pending) {
        return <Pending/>;
      }

      if (this.props.error) {
        return <Error/>;
      }
      return <WrappedComponent {...this.props}/>;
    }
  };
};