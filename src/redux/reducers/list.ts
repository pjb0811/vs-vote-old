import { handleActions } from 'redux-actions';
import { Map, List } from 'immutable';
import { REQUEST_LIST, SUCCESS_LIST, FAILURE_LIST } from '../actions/list';

const initialState = Map({
  pending: false,
  error: false,
  data: List([])
});

export default handleActions(
  {
    [REQUEST_LIST]: (state, action) => {
      return state
        .set('pending', true)
        .set('error', false);
    },

    [SUCCESS_LIST]: (state, action: any) => {
      const { data } = action.payload;
      return state
        .set('pending', false)
        .set('error', false)
        .set('data', List(data));
    },
    [FAILURE_LIST]: (state, action) => {
      return state
        .set('pending', false)
        .set('error', true);
    }
  },
  initialState
);
