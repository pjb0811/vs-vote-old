export interface Props {
  user: UserData;
  history: {
    push: Function;
  };
  className: string;
  UserActions: {
    requestSignInWithAuth: (params: { type: string }) => {};
    resetUserVerify: () => {};
  };
}

export interface State {
  alert: {
    message: string;
    open: boolean;
    type: string;
  };
}

interface UserData {
  pending: boolean;
  error: boolean;
  data: {
    success: boolean;
    message: string;
    isVerifing: boolean;
  };
  toJS: Function;
}
