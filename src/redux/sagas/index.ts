import { all } from 'redux-saga/effects';
import { watchHandleRequestList } from './list';

export default function* rootSaga() {
  yield all([
    watchHandleRequestList(),
  ]);
}