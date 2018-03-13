import * as React from 'react';
import vsList from '../atoms/list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as listActions from '../../redux/actions/list';
import loading from '../hoc/loading';

interface Props {
  ListActions: {
    requestList: (uid: string) => {}
  };
  list: ListData;
  match?: {
    params: {
      uid: string;
    };
  };
}

interface State {
  list: ListData;
}

interface ListData {
  pending: {};
  error: boolean;
  data: [{
    key: string;
    detail: string;
    first: {
      file: string;
      title: string;
      count: number;
    };
    second: {
      file: string;
      title: string;
      count: number;
    };
  }];
  toJS: Function;
}

class List extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  componentWillMount() {
    this.getList();
  }

  getList() {
    const { ListActions, match } = this.props;
    const uid = match ? match.params.uid : '';

    ListActions.requestList(uid);
  }

  render() {
    const list = this.props.list.toJS();
    const Loading = loading(vsList);

    return (
      <div className="ui segment">
        <Loading {...list}/>
      </div>
    );
  }
}

export default connect(
  (state: State) => ({
    list: state.list
  }),
  (dispatch) => ({
    ListActions: bindActionCreators(listActions as Props['ListActions'], dispatch)
  })
)(List);