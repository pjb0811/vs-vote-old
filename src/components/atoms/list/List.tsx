import * as React from 'react';

type Props = {
  list: Array<{
    key: string;
    detail: string;
    first: {
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
      <div className="ui list">       
        {
          list.map((item) => {
            return (
              <div className="item" key={item.key}>
                {''}
              </div>
            );
          })
        }
        {/* 
        <div class="ui massive horizontal divided list">
          <div class="item">
            <img class="ui avatar image" src="/images/avatar/small/helen.jpg">
            <div class="content">
              <div class="header">Helen</div>
            </div>
          </div>
          <div class="item">
            <img class="ui avatar image" src="/images/avatar/small/christian.jpg">
            <div class="content">
              <div class="header">Christian</div>
            </div>
          </div>
          <div class="item">
            <img class="ui avatar image" src="/images/avatar/small/daniel.jpg">
            <div class="content">
              <div class="header">Daniel</div>
            </div>
          </div>
        </div> 
        */}
      </div>
    );
  } 
}

export default List;