import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import firebase from '../../firebase';

async function getListRef(uid: string) {
  let listRef: any = firebase.database().ref('list');
  let list: object[] = [];

  if (uid) {
    listRef = listRef.orderByChild('uid').equalTo(uid);
  } else {
    listRef = listRef.orderByChild('date');
  }

  await listRef.once('value', (snapshot: any) => {
    snapshot.forEach((childSnapshot: any) => {
      const childData = childSnapshot.val();
      list.push(childData);
    });
  });
  return {
    data: list
  };
}

const GET_LIST = 'GET_LIST';
const GET_LIST_PENDING = 'GET_LIST_PENDING';
const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
const GET_LIST_FAILURE = 'GET_LIST_FAILURE';

export const getList = (uid: string) => ({
  type: GET_LIST,
  payload: getListRef(uid)
});

const initialState = Map({
  pending: false,
  error: false,
  data: List([])
});

export default handleActions(
  {
    [GET_LIST_PENDING]: (state, action) => {
      return state
        .set('pending', true)
        .set('error', false);
    },

    [GET_LIST_SUCCESS]: (state, action: any) => {
      const { data } = action.payload;
      return state
        .set('pending', false)
        .set('error', false)
        .set('data', List(data));
    },
    [GET_LIST_FAILURE]: (state, action) => {
      return state
        .set('pending', false)
        .set('error', true);
    }
  },
  initialState
);
