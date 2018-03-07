import * as React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../firebase';
import Error from '../atoms/form/Error';
import Alert from '../atoms/modals/Alert';
import withAuth from '../hoc/auth';

interface Props {
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

interface Values {
  title1: string;
  title2: string;
  file1?: File;
  file2?: File;
  detail: string;
}

interface Actions {
  setErrors: Function;
  setSubmitting: Function;
  setStatus: Function;
  props: any;
}

type State = {
  open: boolean;
};

class Post extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false
    };
  }

  showModal(open: boolean) {
    this.setState((prevState, props) => {
      return {
        open,
      };
    });
  }

  render() {
    const {
      touched,
      errors,
      isSubmitting,
      handleBlur,
      handleSubmit,
      handleChange,
      setFieldValue,
      status
    } = this.props;

    return (
      <div>
        <h2 className="ui teal center aligned header">VS 등록하기</h2>
        <form
          className="ui large form error"
        >
          <div className="ui segment">
            <h4 className="ui dividing header">제목</h4>
            <div className="fields">
              <div className={`seven wide ${errors.title1 && touched.title1 ? 'field error' : 'field'}`}>
                <input
                  type="text"
                  name="title1"
                  placeholder="제목 1"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Error errors={errors} touched={touched} field="title1"/>
              </div>
              <div className="two wide field">
                <strong>VS</strong>
              </div>
              <div className={`seven wide ${errors.title2 && touched.title2 ? 'field error' : 'field'}`}>
                <input
                  type="text"
                  name="title2"
                  placeholder="제목 2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Error errors={errors} touched={touched} field="title2"/>
              </div>
            </div>
            <h4 className="ui dividing header">이미지</h4>
            <div className="fields">
              <div className={`seven wide ${errors.file1 && touched.file1 ? 'field error' : 'field'}`}>
                <input
                  type="file"
                  name="file1"
                  placeholder="Image1"
                  onChange={(e: React.ChangeEvent<any>) => {
                    setFieldValue('file1', e.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                />
                <Error errors={errors} touched={touched} field="file1"/>
              </div>
              <div className="two wide field">
                <strong>VS</strong>
              </div>
              <div className={`seven wide ${errors.file2 && touched.file2 ? 'field error' : 'field'}`}>
                <input
                  type="file"
                  name="file2"
                  placeholder="Image2"
                  onChange={(e: React.ChangeEvent<any>) => {
                    setFieldValue('file2', e.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                />
                <Error errors={errors} touched={touched} field="file2"/>
              </div>
            </div>
            <h4 className="ui dividing header">상세 내용</h4>
            <div className="field">
              <textarea
                name="detail"
                placeholder="상세 내용"
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="ui fluid large teal submit button"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              등록하기
            </button>
          </div>
        </form>
        <Alert
          message={status ? status.message : ''}
          open={status ? status.success : false}
          type={status ? status.type : ''}
          onClose={() => {
            const { history } = this.props;
            const location = {
              pathname: '/',
            };
            history.push(location);
          }}
        />
      </div>
    );
  }
}

const withPost = withFormik({
  mapPropsToValues: (props) => ({
    title1: '',
    title2: '',
    file1: undefined,
    file2: undefined,
    detail: '',
  }),
  validationSchema: Yup.object().shape({
    title1: Yup.string()
      .required('제목1을 입력해주세요.')
      .max(20, '20자 이하로 작성해 주세요.'),
    title2: Yup.string()
      .required('제목2을 입력해주세요.')
      .max(20, '20자 이하로 작성해 주세요.'),
    file1: Yup.mixed().required('파일을 등록해주세요.'),
    file2: Yup.mixed().required('파일을 등록해주세요.'),
  }),
  handleSubmit: (values: Values, actions: Actions) => {
    const { file1, file2 } = values;
    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref();
    let uid: string = '';
    let key: string | null = '';
    let file1Ref: any;
    let file2Ref: any;

    if (user) {
      uid = user.uid;
      key = firebase.database().ref('list').child(uid).push().key;
    }

    if (file1) {
      file1Ref = storageRef.child(`images/${key}/${file1.name}`);
      if (!file1.name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
        actions.setErrors({ file1: '이미지 파일을 등록해주세요.' });
        return;
      }
    }

    if (file2) {
      file2Ref = storageRef.child(`images/${key}/${file2.name}`);
      if (!file2.name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
        actions.setErrors({ file2: '이미지 파일을 등록해주세요.' });
        return;
      }
    }

    setVote();

    async function setVote() {
      const { title1, title2, detail } = values;

      await file1Ref.put(file1);
      const url1 = await file1Ref.getDownloadURL().then((url: string) => {
        return url;
      });
      await file2Ref.put(file2);
      const url2 = await file2Ref.getDownloadURL().then((url: string) => {
        return url;
      });
      firebase.database().ref(`list/${uid}/${key}`).set({
        key,
        uid,
        first: {
          title: title1,
          file: url1,
          count: 1,
        },
        second: {
          title: title2,
          file: url2,
          count: 1,
        },
        detail,
        voters: {},
        date: new Date().getTime() * -1,
      });

      actions.setSubmitting(false);
      actions.setStatus({
        message: '등록되었습니다.',
        success: true,
        type: 'success'
      });
    }
  },

  displayName: 'Post',
})(withAuth(Post));

export default withPost;