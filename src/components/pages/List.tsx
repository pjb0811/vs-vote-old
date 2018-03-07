import * as React from 'react';
import vsList from '../atoms/list';
import { connect } from 'react-redux';
import * as listActions from '../../redux/modules/list';
import { bindActionCreators } from 'redux';
import loading from '../hoc/loading';

interface Props {
  ListActions: typeof listActions;
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

  getList = async () => {
    const { ListActions, match } = this.props;
    const uid = match ? match.params.uid : '';

    try {
      await ListActions.getList(uid);
    } catch (e) {
      console.log(e);
    }
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
    ListActions: bindActionCreators(listActions, dispatch)
  })
)(List);