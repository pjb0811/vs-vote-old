export interface Props {
  UserActions: {
    requestLogin: (params: { type: string }) => {};
    resetLogin: () => {};
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
  setErrors: (fields: { [field: string]: string }) => void;
  setSubmitting: (isSubmitting: boolean) => void;
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
