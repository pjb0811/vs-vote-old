import { all } from 'redux-saga/effects';
import { watchHandleRequestList } from './list';
import { watchHandleRequestSignAuthWith } from './signWIthAuth';

export default function* rootSaga() {
  yield all([watchHandleRequestList(), watchHandleRequestSignAuthWith()]);
}
