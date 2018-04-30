import { call, put, takeEvery, fork } from 'redux-saga/effects';
import * as list from '../actions/list';
import * as api from '../../lib/apis';

function* runRequestList(action: { payload: object }) {
  try {
    const { data } = yield call(api.list.getList as any, action.payload);
    yield put({ type: list.SUCCESS_LIST, payload: { data } });
  } catch (error) {
    yield put({ type: list.FAILURE_LIST, payload: { error } });
  }
}
function* handleRequestList() {
  yield takeEvery(list.REQUEST_LIST as any, runRequestList);
}

export function* watchHandleRequestList() {
  yield fork(handleRequestList);
}
