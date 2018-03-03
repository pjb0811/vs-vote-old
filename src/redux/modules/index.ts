import { combineReducers } from 'redux';
import list from './list';
import counter from './counter';
import post from './post';

export default combineReducers({
  list,
  counter,
  post
});