export interface Props {
  values: Values;
  touched: {
    email: boolean;
  };
  errors: {
    email: boolean;
  };
  status?: {
    message: string;
    success: boolean;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
  handleSubmit: (e: React.FormEvent<any>) => void;
  history: {
    push: Function;
  };
}

export interface Values {
  email: string;
}

export interface Actions {
  setErrors: Function;
  setSubmitting: Function;
  setStatus: Function;
  props: any;
}
