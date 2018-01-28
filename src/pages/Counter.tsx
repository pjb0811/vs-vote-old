import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from '../redux/modules/counter';
import * as postActions from '../redux/modules/post';

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
    // 컴포넌트가 처음 마운트 될 때 현재 number 를 postId 로 사용하여 포스트 내용을 불러옵니다.
    const { counter } = this.props;
    this.getPost(counter);
  }

  componentWillReceiveProps(nextProps: Props) {
    // 현재 number 와 새로 받을 number 가 다를 경우에 요청을 시도합니다.
    if (this.props.counter !== nextProps.counter) {
      this.getPost(nextProps.counter);
    }
  }

  getPost = async (postId: number) => {
    const { PostActions } = this.props;

    try {
      await PostActions.getPost(postId);
      console.log('요청이 완료 된 다음에 실행됨');
    } catch (e) {
      console.log('에러가 발생!');
    }
  }

  render() {
    const { post, counter, CounterActions } = this.props;
    const result = post.toJS();

    return (
      <div>
      <h1>{counter}</h1>
      <button onClick={CounterActions.increment}>+</button>
      <button onClick={CounterActions.decrement}>-</button>
      {result.pending && <h2>로딩중...</h2>}
      { result.error
          ? <h1>에러발생!</h1>
          : (
              <div>
                  <h1>{result.data.title}</h1>
                  <p>{result.data.body}</p>
              </div>
          )}
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