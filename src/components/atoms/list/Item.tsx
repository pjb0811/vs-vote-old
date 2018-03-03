import * as React from 'react';
import { Progress } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';
import { Transition } from 'semantic-ui-react';

type Props = {
  item: {
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
  }
};

class Item extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="ui item" key={item.key}>
        <div className="ui container">
          <div className="ui center aligned segment">
            <div className="ui grid">
              <div className="row">
                <div className="seven wide column">
                  <h3>{item.first.title}</h3>
                  <LazyLoad height={'100%'} placeholder={<div>loading...</div>}>
                    <Transition visible={false} animation="scale" duration={1000}>
                      <img className="ui fluid image" src={item.first.file}/>
                    </Transition>
                  </LazyLoad>
                </div>
                <div className="two wide column">
                  <strong>VS</strong>
                </div>
                <div className="seven wide column">
                  <h3>{item.second.title}</h3>
                  <LazyLoad height={'100%'}>
                  <img className="ui fluid image" src={item.second.file}/>
                  </LazyLoad>
                </div>
              </div>
              {/* {
                item.detail &&
                <div className="row">
                  <div className="sixteen wide column">
                    {item.detail}
                  </div>
                </div>
              } */}
              <div className="row">
                <div className="seven wide column">
                  <Progress
                    value={item.first.count}
                    total={item.first.count + item.second.count}
                    progress="percent"
                    color="teal"
                  />
                </div>
                <div className="two wide column">{''}</div>
                <div className="seven wide column">
                  <Progress
                    value={item.second.count}
                    total={item.first.count + item.second.count}
                    progress="percent"
                    color="teal"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;