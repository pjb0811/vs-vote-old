import * as React from 'react';
import { Progress } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';
// import Loading from '../../pages/Loading';

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
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <div className="ui divided items">
        {
          data.map((item) => {
            return (
              <LazyLoad key={item.key}>
                <div className="ui item" key={item.key}>
                  <div className="ui container">
                    <div className="ui center aligned segment">
                      <div className="ui grid">
                        <div className="row">
                          <div className="seven wide column">
                            <h3>{item.first.title}</h3>
                            <img className="ui fluid image" src={item.first.file}/>
                          </div>
                          <div className="two wide column">
                            <strong>VS</strong>
                          </div>
                          <div className="seven wide column">
                            <h3>{item.second.title}</h3>
                            <img className="ui fluid image" src={item.second.file}/>
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
              </LazyLoad>
            );
          })
        }
      </div>
    );
  }
}

export default List;