import * as React from 'react';

type Props = {
  list: Array<{
    key: string;
    detail: string;
    first: {
      file: string;
      title: string;
    },
    second: {
      file: string;
      title: string;
    }
  }>
};

class List extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  
  render() {
    const { list } = this.props;
    return (
      <div className="ui divided items">       
        {
          list.map((item) => {
            return (
              <div className="ui item" key={item.key}>
                <div className="ui container">
                  <div className="ui segment">
                    <div className="ui grid">
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
                      {
                        item.detail && 
                        <div className="sixteen wide column">
                          {item.detail}
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        }
      </div>
    );
  } 
}

export default List;