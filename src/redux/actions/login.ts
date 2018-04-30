import { createAction } from 'redux-actions';

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const SUCCESS_LOGIN = 'SUCCESS_LOGIN';
export const FAILURE_LOGIN = 'FAILURE_LOGIN';

export const requestLogin = createAction(REQUEST_LOGIN);
export const successLogin = createAction(SUCCESS_LOGIN);
export const failureLogin = createAction(FAILURE_LOGIN);

export const REQUEST_SIGN_IN_WITH_AUTH = 'REQUEST_SIGN_IN_WITH_AUTH';
export const SUCCESS_SIGN_IN_WITH_AUTH = 'SUCCESS_SIGN_IN_WITH_AUTH';
export const FAILURE_SIGN_IN_WITH_AUTH = 'FAILURE_SIGN_IN_WITH_AUTH';

export const requestSignInWithAuth = createAction(REQUEST_SIGN_IN_WITH_AUTH);
export const successSignInWithAuth = createAction(SUCCESS_SIGN_IN_WITH_AUTH);
export const failureSignInWithAuth = createAction(FAILURE_SIGN_IN_WITH_AUTH);
