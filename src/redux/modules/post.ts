import { handleActions } from 'redux-actions';
import axios from 'axios';
import { Map } from 'immutable';

function getPostAPI(postId: number) {
  return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

const GET_POST = 'GET_POST';
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const getPost = (postId: number) => ({
    type: GET_POST,
    payload: getPostAPI(postId)
});

const initialState = Map({
  pending: false,
  error: false,
  data: Map({
    title: '',
    body: ''
  })
});

export default handleActions(
  {
    [GET_POST_PENDING]: (state, action) => {
      return state.set('pending', true).set('error', false);
    },

    [GET_POST_SUCCESS]: (state, action: any) => {
      const { title, body } = action.payload.data;
      return state.set('pending', false).set('error', false)
        .setIn(['data', 'title'], title).setIn(['data', 'body'], body);
    },
    [GET_POST_FAILURE]: (state, action) => {
      return state.set('pending', false).set('error', true);
    }
  },
  initialState
);
