export interface Props {
  values: Values;
  touched: {
    title1: boolean;
    title2: boolean;
    file1: boolean;
    file2: boolean;
  };
  errors: {
    title1: boolean;
    title2: boolean;
    file1: boolean;
    file2: boolean;
  };
  status?: {
    message: string;
    success: boolean;
    type: string;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<any>) => void;
  handleBlur: (e: any) => void;
  handleSubmit: (e: React.FormEvent<any>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  isValid: boolean;
  history: {
    push: Function;
  };
}

export interface Values {
  title1: string;
  title2: string;
  file1?: File;
  file2?: File;
  detail: string;
}

export interface Actions {
  setErrors: Function;
  setSubmitting: Function;
  setStatus: Function;
  props: any;
}

export interface State {
  open: boolean;
}
