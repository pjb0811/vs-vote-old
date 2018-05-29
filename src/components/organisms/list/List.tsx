import * as React from 'react';
// import Item from './Item';
// import LazyLoad from 'react-lazyload';
// import withLoading from '../../hoc/loading';

class List extends React.Component {
  render() {
    // const { data } = this.props;
    return (
      <div className="ui divided items">
        {/* {data.map(item => {
          return (
            <LazyLoad throttle={500} height={300} key={item.key}>
              <Item item={item} />
            </LazyLoad>
          );
        })} */}
      </div>
    );
  }
}

export default List;
