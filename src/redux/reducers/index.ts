import { combineReducers } from 'redux';
import list from './list';
import signWithAuth from './signWithAuth';

export default combineReducers({
  list,
  signWithAuth
});
