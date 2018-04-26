export interface Props {
  values: Values;
  touched: {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  errors: {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
  handleSubmit: (e: React.FormEvent<any>) => void;
}

export interface Values {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface Actions {
  setErrors: Function;
  setSubmitting: Function;
  props: any;
}
