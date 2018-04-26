import { call, put, takeEvery, fork } from 'redux-saga/effects';
import * as signWithAuth from '../actions/signWithAuth';
import API from '../apis';

function* runRequestSignAuthWith(action: { payload: object }) {
  try {
    const { data } = yield call(API.checkSignWithAuth as any, action.payload);
    yield put({ type: signWithAuth.SUCCESS_SIGN_WITH_AUTH, payload: { data } });
  } catch (error) {
    yield put({
      type: signWithAuth.FAILURE_SIGN_WITH_AUTH,
      payload: { error }
    });
  }
}
function* handleRequestSignAuthWith() {
  yield takeEvery(
    signWithAuth.REQUEST_SIGN_WITH_AUTH as any,
    runRequestSignAuthWith
  );
}

export function* watchHandleRequestSignAuthWith() {
  yield fork(handleRequestSignAuthWith);
}
