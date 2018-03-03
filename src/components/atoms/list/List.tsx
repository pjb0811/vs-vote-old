import * as React from 'react';
import Item from './Item';

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
              <Item item={item} key={item.key}/>
            );
          })
        }
      </div>
    );
  }
}

export default List;