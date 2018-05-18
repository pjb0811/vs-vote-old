import { call, put, takeEvery, fork } from 'redux-saga/effects';
import * as user from '../actions/user';
import * as api from 'lib/apis';

function* runRequestLogin(action: { payload: object }) {
  try {
    const { data } = yield call(api.user.checkLogin as any, action.payload);
    yield put({ type: user.SUCCESS_LOGIN, payload: { data } });
  } catch (error) {
    yield put({
      type: user.FAILURE_LOGIN,
      payload: { error }
    });
  }
}

function* handleRequestLogin() {
  yield takeEvery(user.REQUEST_LOGIN as any, runRequestLogin);
}

export function* watchHandleRequestLogin() {
  yield fork(handleRequestLogin);
}

function* runRequestSignInWithAuth(action: { payload: object }) {
  try {
    const { data } = yield call(
      api.user.checkSignInWithAuth as any,
      action.payload
    );
    yield put({ type: user.SUCCESS_SIGN_IN_WITH_AUTH, payload: { data } });
  } catch (error) {
    yield put({
      type: user.FAILURE_SIGN_IN_WITH_AUTH,
      payload: { error }
    });
  }
}

function* handleRequestSignInWithAuth() {
  yield takeEvery(
    user.REQUEST_SIGN_IN_WITH_AUTH as any,
    runRequestSignInWithAuth
  );
}

export function* watchHandleRequestSignInWithAuth() {
  yield fork(handleRequestSignInWithAuth);
}
