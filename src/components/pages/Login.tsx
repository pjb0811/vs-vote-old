import  * as React from 'react';
// import { Button, Icon } from 'semantic-ui-react';
// import { NavLink } from 'react-router-dom';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../firebase';

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
  isSubmitting: any;
  handleChange: any;
  handleBlur: any;
  handleSubmit: any;
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

  signInWithGoogle() {
    // var provider = new firebase.auth.GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    // firebase.auth().signInWithRedirect(provider);
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
            {
              errors.email && touched.email &&
              <div className="ui error message">
                <p>{errors.email}</p>
              </div>
            }
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
            {
              errors.password && touched.password &&
              <div className="ui error message">
                <p>{errors.password}</p>
              </div>
            }
            <button
              type="submit"
              className="ui fluid large teal submit button"
              disabled={isSubmitting}
            >
              로그인하기
            </button>
          </div>
          <div className="ui center aligned segment">
            <button
              type="button"
              className="ui google plus button"
              onClick={() => {
                this.signInWithGoogle();
              }}
            >
              <i className="google plus icon"/>
              Google Plus로 로그인
            </button>
          </div>
        </form>
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
          const { history } = actions.props;
          const location = {
            pathname: '/',
            state: {}
          };
          history.push(location);
        },
        (error) => {
          actions.setErrors({ email: 'Error: ' + error.message });
        });
    actions.setSubmitting(false);
  },

  displayName: 'Login',
})(Login);

export default withLogin;