import  * as React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../firebase';
import AuthLoginGroup from '../atoms/buttons/AuthLoginGroup';
import AuthLogin from '../atoms/buttons/AuthLogin';
import Error from '../atoms/form/Error';
import { NavLink } from 'react-router-dom';

interface Props {
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

interface Values {
  email: string;
  password: string;
}

interface Actions {
  setErrors: Function;
  setSubmitting: Function;
  props: any;
}

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
      <div className="ui container">
        <h2 className="ui teal center aligned header">로그인</h2>
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
                  placeholder="이메일"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <Error errors={errors} touched={touched} field="email"/>
            <div className={errors.password && touched.password ? 'field error' : 'field'}>
              <div className="ui left icon input">
                <i className="lock icon"/>
                <input
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            <Error errors={errors} touched={touched} field="password"/>
            <div className="ui field">
              <button
                type="submit"
                className="ui fluid teal submit button"
                disabled={isSubmitting}
              >
                로그인하기
              </button>
            </div>
            <div className="ui field">
              <AuthLoginGroup history={...history} className="three ui buttons">
                <AuthLogin type="google"/>
                <AuthLogin type="facebook" />
                <AuthLogin type="github"/>
              </AuthLoginGroup>
            </div>
          </div>
        </form>
        <div className="ui clearing message">
          비밀번호를 잊어버리신 경우 <NavLink to="/resetPassword">비밀번호를 재설정</NavLink>해주세요.
        </div>
      </div>
    );
  }
}

const withLogin = withFormik({
  mapPropsToValues: (props) => ({
    email: '',
    password: '',
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string().email('이메일 형식이 아닙니다.').required('이메일 주소를 입력해주세요.'),
    password: Yup.string().min(6, '6자리 이상 입력해주세요.').required('비밀번호를 입력해주세요.'),
  }),

  handleSubmit: (values: Values, actions: Actions) => {
    const { email, password } = values;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (user) => {
          actions.setSubmitting(false);
          const { history } = actions.props;
          const location = {
            pathname: '/',
          };
          history.push(location);
        },
        (error) => {
          actions.setSubmitting(false);
          actions.setErrors({ email: 'Error: ' + error.message });
        });
  },

  displayName: 'Login',
})(Login);

export default withLogin;