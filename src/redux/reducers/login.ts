import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import {
  REQUEST_LOGIN,
  SUCCESS_LOGIN,
  FAILURE_LOGIN,
  REQUEST_SIGN_IN_WITH_AUTH,
  SUCCESS_SIGN_IN_WITH_AUTH,
  FAILURE_SIGN_IN_WITH_AUTH
} from '../actions/login';

const initialState = Map({
  pending: false,
  error: false,
  data: Map({
    success: true,
    message: ''
  })
});

export default handleActions(
  {
    [REQUEST_LOGIN]: (state, action) => {
      return state.set('pending', true).set('error', false);
    },
    [SUCCESS_LOGIN]: (state, action: any) => {
      const { data } = action.payload;
      return state
        .set('pending', false)
        .set('error', false)
        .set('data', Map(data));
    },
    [FAILURE_LOGIN]: (state, action) => {
      return state.set('pending', false).set('error', true);
    },
    [REQUEST_SIGN_IN_WITH_AUTH]: (state, action) => {
      return state.set('pending', true).set('error', false);
    },
    [SUCCESS_SIGN_IN_WITH_AUTH]: (state, action: any) => {
      const { data } = action.payload;
      return state
        .set('pending', true)
        .set('error', false)
        .set('data', Map(data));
    },
    [FAILURE_SIGN_IN_WITH_AUTH]: (state, action) => {
      return state.set('pending', false).set('error', true);
    }
  },
  initialState
);
