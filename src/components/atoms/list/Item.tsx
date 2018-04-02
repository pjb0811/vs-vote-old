import * as React from 'react';
import { Progress } from 'semantic-ui-react';
import LazyLoad from 'react-lazyload';
import { Transition } from 'semantic-ui-react';
import Vote from '../../atoms/buttons/Vote';

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
    uid: string;
  }
};

interface State {
  image1: {
    loaded: boolean;
  };
  image2: {
    loaded: boolean;
  };
  duration: number;
}

class Item extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      image1: {
        loaded: false,
      },
      image2: {
        loaded: false,
      },
      duration: 1000
    };
  }

  setImage(params: { name: string, loaded: boolean }) {
    const { name, loaded } = params;
    this.setState(
      (prevState, props) => {
        return {
          ...prevState,
          [name]: {
            loaded
          },
        };
      }
    );
  }

  render() {
    const { item } = this.props;
    const { image1, image2, duration } = this.state;
    const loader = (
      <div>
        <div className="ui active loader">{''}</div>
      </div>
    );

    return (
      <div className="ui item">
        <div className="ui container">
          <div className="ui center aligned segment">
            <div className="ui grid">
              <div className="row">
                <div className="seven wide column">
                  <h3>{item.first.title}</h3>
                  <img
                    className="ui image hidden"
                    src={item.first.file}
                    onLoad={() => {
                      this.setImage({
                        name: 'image1',
                        loaded: true,
                      });
                    }}
                  />
                  <LazyLoad height={'100%'} placeholder={loader}>
                    <Transition
                      visible={image1.loaded}
                      transitionOnMount={true}
                      animation="scale"
                      duration={duration}
                    >
                      <img
                        className="ui fluid image middle aligned"
                        src={item.first.file}
                      />
                    </Transition>
                  </LazyLoad>
                </div>
                <div className="two wide column">
                  <strong>VS</strong>
                </div>
                <div className="seven wide column">
                  <h3>{item.second.title}</h3>
                  <img
                    className="ui image hidden"
                    src={item.second.file}
                    onLoad={() => {
                      this.setImage({
                        name: 'image2',
                        loaded: true,
                      });
                    }}
                  />
                  <LazyLoad height={'100%'} placeholder={loader}>
                    <Transition
                      visible={image2.loaded}
                      transitionOnMount={true}
                      animation="scale"
                      duration={duration}
                    >
                      <img
                        className="ui fluid image middle aligned"
                        src={item.second.file}
                      />
                    </Transition>
                  </LazyLoad>
                </div>
              </div>
              {
                item.detail &&
                <div className="row">
                  <div className="sixteen wide column">
                    {item.detail}
                  </div>
                </div>
              }
              <div className="row">
                <div className="seven wide column">
                  <Progress
                    value={item.first.count}
                    total={item.first.count + item.second.count}
                    progress="percent"
                    color="teal"
                  />
                  <Vote item={item} target="first"/>
                </div>
                <div className="two wide column">{''}</div>
                <div className="seven wide column">
                  <Progress
                    value={item.second.count}
                    total={item.first.count + item.second.count}
                    progress="percent"
                    color="teal"
                  />
                  <Vote item={item} target="second"/>
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