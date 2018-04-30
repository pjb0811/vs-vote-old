import * as React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import AuthLoginGroup from '../atoms/buttons/AuthLoginGroup';
import AuthLogin from '../atoms/buttons/AuthLogin';
import Error from '../atoms/form/Error';
import { NavLink } from 'react-router-dom';
import { Props, Values, Actions } from '../../interface/pages/Login';
import * as api from '../../lib/apis';

class Login extends React.Component<Props> {
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
      handleSubmit,
      history
    } = this.props;

    return (
      <div>
        <h2 className="ui teal center aligned header">Login</h2>
        <form className="ui large form error segments" onSubmit={handleSubmit}>
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
            <div className="ui field">
              <button
                type="submit"
                className="ui fluid teal submit button"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
            <div className="ui field">
              <AuthLoginGroup history={history} className="three ui buttons">
                <AuthLogin type="google" />
                <AuthLogin type="facebook" />
                <AuthLogin type="github" />
              </AuthLoginGroup>
            </div>
          </div>
        </form>
        <div className="ui clearing message">
          If you forget your password, please{' '}
          <NavLink to="/resetPassword">reset your password.</NavLink>
        </div>
      </div>
    );
  }
}

const withLogin = withFormik({
  mapPropsToValues: props => ({
    email: '',
    password: ''
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address.')
      .required('Please enter your email address.'),
    password: Yup.string()
      .min(6, 'Please enter at least 6 digits.')
      .required('Please enter a password.')
  }),
  handleSubmit: (values: Values, actions: Actions) => {
    const { email, password } = values;
    api.login.checkLogin({ email, password }).then(
      (user: any) => {
        actions.setSubmitting(false);
        const { history } = actions.props;
        const location = {
          pathname: '/'
        };
        history.push(location);
      },
      (error: any) => {
        actions.setSubmitting(false);
        actions.setErrors({ email: 'Error: ' + error.message });
      }
    );
  },
  displayName: 'Login'
})(Login);

export default withLogin;
