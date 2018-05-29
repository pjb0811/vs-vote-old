import * as React from 'react';
import { Props } from 'interface/organisms/list';
import { Props as ItemProps } from 'interface/molecules/item';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'redux/actions/list';
import LazyLoad from 'react-lazyload';
import Item from 'components/molecules/item';

class List extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.getList();
  }

  getList() {
    const { ListActions, match } = this.props;
    const uid = match ? match.params.uid : '';
    ListActions.requestList({ uid });
  }

  render() {
    const { data }: Props['list'] = this.props.list.toJS();

    return (
      <div className="ui divided items">
        {data.map((item: ItemProps['item']) => {
          return (
            <LazyLoad throttle={500} height={300} key={item.key}>
              <Item item={item} />
            </LazyLoad>
          );
        })}
      </div>
    );
  }
}

export default connect(
  (state: Props) => ({
    list: state.list
  }),
  dispatch => ({
    ListActions: bindActionCreators(
      listActions as Props['ListActions'],
      dispatch
    )
  })
)(List);
