import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from '../../redux/modules/counter';
import * as postActions from '../../redux/modules/post';
import loading from '../hoc/loading';

interface Props {
  PostActions: typeof postActions;
  CounterActions: typeof counterActions;
  counter: number;
  post: Post;
}

interface State {
  counter: number;
  post: Post;
}

type Post = {
  pending: {};
  error: boolean;
  data: {
    title: string;
    body: string;
  };
  toJS: Function;
};

class Counter extends React.Component<Props> {
  componentWillMount() {
    const { counter } = this.props;
    this.getPost(counter);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.counter !== nextProps.counter) {
      this.getPost(nextProps.counter);
    }
  }

  getPost = async (postId: number) => {
    const { PostActions } = this.props;

    try {
      await PostActions.getPost(postId);
    } catch (e) {
      console.log(e);
    }
  }

  viewPost = (res: Post) => {
    return (
      <div>
        <h1>{res.data.title}</h1>
        <p>{res.data.body}</p>
      </div>
    );
  }

  render() {
    const { post, counter, CounterActions } = this.props;
    const res = post.toJS();
    const Loading = loading(this.viewPost);

    return (
      <div>
      <h1>{counter}</h1>
      <button onClick={CounterActions.increment}>+</button>
      <button onClick={CounterActions.decrement}>-</button>
      <Loading {...res}/>
      </div>
    );
  }
}

export default connect(
  (state: State) => ({
    counter: state.counter,
    post: state.post
  }),
  (dispatch) => ({
    CounterActions: bindActionCreators(counterActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(Counter);