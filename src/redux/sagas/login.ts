import { call, put, takeEvery, fork } from 'redux-saga/effects';
import * as login from '../actions/login';
import * as api from '../../lib/apis';

function* runRequestLogin(action: { payload: object }) {
  try {
    const { data } = yield call(api.login.checkLogin as any, action.payload);
    yield put({ type: login.SUCCESS_LOGIN, payload: { data } });
  } catch (error) {
    yield put({
      type: login.FAILURE_LOGIN,
      payload: { error }
    });
  }
}

function* handleRequestLogin() {
  yield takeEvery(login.REQUEST_LOGIN as any, runRequestLogin);
}

export function* watchHandleRequestLogin() {
  yield fork(handleRequestLogin);
}

function* runRequestSignInWithAuth(action: { payload: object }) {
  try {
    const { data } = yield call(
      api.login.checkSignInWithAuth as any,
      action.payload
    );
    yield put({ type: login.SUCCESS_SIGN_IN_WITH_AUTH, payload: { data } });
  } catch (error) {
    yield put({
      type: login.FAILURE_SIGN_IN_WITH_AUTH,
      payload: { error }
    });
  }
}

function* handleRequestSignInWithAuth() {
  yield takeEvery(
    login.REQUEST_SIGN_IN_WITH_AUTH as any,
    runRequestSignInWithAuth
  );
}

export function* watchHandleRequestSignInWithAuth() {
  yield fork(handleRequestSignInWithAuth);
}
