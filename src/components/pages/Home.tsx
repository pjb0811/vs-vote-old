import * as React from 'react';
import List from '../atoms/list';
import { connect } from 'react-redux';
import * as listActions from '../../redux/modules/list';
import { bindActionCreators } from 'redux';
import loading from '../hoc/loading';

interface Props {
  ListActions: typeof listActions;
  list: ListData;
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

class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentWillMount() {
    this.getList();
  }
  getList = async () => {
    const { ListActions } = this.props;

    try {
      await ListActions.getList();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const list = this.props.list.toJS();
    const Loading = loading(List);
    return (
      <div className="ui container">
        <div className="ui segment">
          <Loading {...list}/>
        </div>
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
)(Home);