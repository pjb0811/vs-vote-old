import * as React from 'react';
import Item from './Item';
// import { Progress } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';

type Props = {
  data: Array<{
    key: string;
    detail: string;
    first: {
      file: string;
      title: string;
      count: number;
    },
    second: {
      file: string;
      title: string;
      count: number;
    }
  }>
};

class List extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return (
      <div className="ui divided items">
        {
          data.map((item) => {
            return (
              <LazyLoad throttle={1000} height={355} key={item.key}>
                <Item item={item}/>
              </LazyLoad>
            );
          })
        }
      </div>
    );
  }
}

export default List;