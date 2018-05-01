export interface Props {
  UserActions: {
    requestLogin: (params: { type: string }) => {};
  };
  user: UserData;
  values: Values;
  touched: {
    email: boolean;
    password: boolean;
  };
  errors: {
    email: boolean;
    password: boolean;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
  handleSubmit: (e: React.FormEvent<any>) => void;
  history: any;
}

export interface Values {
  email: string;
  password: string;
}

export interface Actions {
  setErrors: Function;
  setSubmitting: Function;
  props: any;
}

interface UserData {
  pending: boolean;
  error: boolean;
  data: {
    success: boolean;
    message: string;
  };
  toJS: Function;
}
