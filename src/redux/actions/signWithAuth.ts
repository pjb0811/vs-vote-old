import { createAction } from 'redux-actions';

export const REQUEST_SIGN_WITH_AUTH = 'REQUEST_SIGN_WITH_AUTH';
export const SUCCESS_SIGN_WITH_AUTH = 'SUCCESS_SIGN_WITH_AUTH';
export const FAILURE_SIGN_WITH_AUTH = 'FAILURE_SIGN_WITH_AUTH';

export const requestSignWithAuth = createAction(REQUEST_SIGN_WITH_AUTH);
export const successSignWithAuth = createAction(SUCCESS_SIGN_WITH_AUTH);
export const failureSignWithAuth = createAction(FAILURE_SIGN_WITH_AUTH);
