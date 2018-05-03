import * as React from 'react';
import VsList from '../atoms/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from 'redux/actions/list';
import { Props } from 'interface/pages/List';

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
    const list = this.props.list.toJS();

    return (
      <div className="ui segment">
        <VsList {...list} />
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
