import { all } from 'redux-saga/effects';
import { watchHandleRequestList } from './list';
import { watchHandleRequestLogin } from './login';

export default function* rootSaga() {
  yield all([watchHandleRequestList(), watchHandleRequestLogin()]);
}
