import * as React from 'react';
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

class SignUp extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {};
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
        <h2 className="ui teal center aligned header">회원 가입</h2>
        <form
          className="ui large form error"
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
              가입하기
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const withSignUp = withFormik({
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

    firebase.auth().createUserWithEmailAndPassword(email, password)
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

  displayName: 'SignUp',
})(SignUp);

export default withSignUp;