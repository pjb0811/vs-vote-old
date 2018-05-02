import * as React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../firebase';
import Error from '../atoms/form/Error';
import { Props, Values, Actions } from '../../interface/pages/SignUp';

class SignUp extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {
      values,
      touched,
      errors,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit
    } = this.props;

    return (
      <div>
        <h2 className="ui teal center aligned header">Sign Up</h2>
        <form className="ui large form error" onSubmit={handleSubmit}>
          <div className="ui segment">
            <div
              className={
                errors.email && touched.email ? 'field error' : 'field'
              }
            >
              <div className="ui left icon input">
                <i className="mail icon" />
                <input
                  type="text"
                  name="email"
                  placeholder="e-mail"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <Error errors={errors} touched={touched} field="email" />
            <div
              className={
                errors.password && touched.password ? 'field error' : 'field'
              }
            >
              <div className="ui left icon input">
                <i className="lock icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <Error errors={errors} touched={touched} field="password" />
            <div
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? 'field error'
                  : 'field'
              }
            >
              <div className="ui left icon input">
                <i className="lock icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <Error errors={errors} touched={touched} field="confirmPassword" />
            <button
              type="submit"
              className="ui fluid large teal submit button"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const withSignUp = withFormik({
  mapPropsToValues: props => ({
    email: '',
    password: '',
    confirmPassword: ''
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address.')
      .required('Please enter your email address.'),
    password: Yup.string()
      .min(6, 'Please enter at least 6 digits.')
      .required('Please enter a password.'),
    confirmPassword: Yup.mixed()
      .oneOf([Yup.ref('password')], 'Passwords do not match.')
      .required('Please confirm your password.')
  }),
  handleSubmit: (values: Values, actions: Actions) => {
    let { email, password } = values;

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        (user: any) => {
          const { history } = actions.props;
          const location = {
            pathname: '/'
          };
          firebase
            .database()
            .ref('users/' + user.uid)
            .set({
              email,
              password
            });
          history.push(location);
        },
        (error: any) => {
          actions.setErrors({ email: 'Error: ' + error.message });
          actions.setSubmitting(false);
        }
      );
  },

  displayName: 'SignUp'
})(SignUp);

export default withSignUp;
