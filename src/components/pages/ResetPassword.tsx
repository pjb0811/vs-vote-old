import * as React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Error from '../atoms/form/Error';
import firebase from '../../firebase';
import Confirm from '../atoms/modals/Confirm';

interface Props {
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

interface Values {
  email: string;
}

interface Actions {
  setErrors: Function;
  setSubmitting: Function;
  setStatus: Function;
  props: any;
}

class ResetPassword extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const {
      values,
      touched,
      errors,
      status,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
    } = this.props;

    return (
      <div>
        <h2 className="ui teal center aligned header">Reset Password</h2>
        <form
          className="ui large form error segments"
          onSubmit={handleSubmit}
        >
          <div className="ui segment">
            <div className={errors.email && touched.email ? 'field error' : 'field'}>
              <div className="ui left icon input">
                <i className="mail icon"/>
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <Error errors={errors} touched={touched} field="email"/>
            <div className="ui field">
              <button
                type="submit"
                className="ui fluid teal submit button"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <Confirm
          message={status ? status.message : ''}
          open={status ? status.success : false}
          approve={() => {
            const { history } = this.props;
            const location = {
              pathname: '/login',
            };
            history.push(location);
          }}
        />
      </div>
    );
  }
}

const withResetPassword = withFormik({
  mapPropsToValues: (props) => ({
    email: '',
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address.')
      .required('Please enter your email address.'),
  }),

  handleSubmit: (values: Values, actions: Actions) => {
    const auth = firebase.auth();
    const { email } = values;

    auth.sendPasswordResetEmail(email).then(() => {
      actions.setStatus({
        message: 'A password reset email has been sent. Please confirm and reset your password.',
        success: true,
      });
    }).catch((error) => {
      actions.setErrors({ email: 'Error: ' + error.message });
      actions.setSubmitting(false);
    });
  },

  displayName: 'resetPassword',
})(ResetPassword);

export default withResetPassword;