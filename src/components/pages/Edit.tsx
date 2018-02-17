import * as React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../firebase';
import Error from '../atoms/form/Error';

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
  isSubmitting: any;
  handleChange: any;
  handleBlur: any;
  handleSubmit: any;
  setFieldValue: any;
  isValid: boolean;
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
  props: any;
}

type State = {
  isOpen: boolean;
};

class Edit extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  showModal(isOpen: boolean) {
    this.setState((prevState, props) => {
      return {
        isOpen,
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
    } = this.props;

    return (
      <div className="ui container">
        <h2 className="ui teal center aligned header">VS 등록하기</h2>
        <form
          className="ui large form error"
        >
          <div className="ui segment">
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
            <div className="fields">
              <div className={`seven wide ${errors.file1 && touched.file1 ? 'field error' : 'field'}`}>
                <input
                  type="file"
                  name="file1"
                  placeholder="Image1"
                  onChange={(e: any) => {
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
                  onChange={(e: any) => {
                    setFieldValue('file2', e.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                />
                <Error errors={errors} touched={touched} field="file2"/>
              </div>
            </div>
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
      </div>
    );
  }
}

const withEdit = withFormik({
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
    let file1Name, file2Name;
    
    if (file1) {
      file1Name = file1.name;
      if (!file1.name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
        actions.setErrors({ file1: '이미지 파일을 등록해주세요.' });
        return;
      }
    }

    if (file2) {
      file2Name = file2.name;
      if (!file2.name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
        actions.setErrors({ file2: '이미지 파일을 등록해주세요.' });
        return;
      }
    }

    const user = firebase.auth().currentUser;
    const key = firebase.database().ref().child('list').push().key;
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const file1Ref = storageRef.child(`images/${key}/${file1Name}`);
    const file2Ref = storageRef.child(`images/${key}/${file2Name}`);

    if (user) {
      const { uid } = user;
      setVote(uid);
    }

    async function setVote(uid: string) {
      const { history } = actions.props;
      const { title1, title2, detail } = values;
      const location = {
        pathname: '/',
      };
      await file1Ref.put(file1);
      const url1 = await file1Ref.getDownloadURL().then((url: string) => {
        return url;
      });
      await file2Ref.put(file2);
      const url2 = await file2Ref.getDownloadURL().then((url: string) => {
        return url;
      });
      await firebase.database().ref('list/' + key).set({
        key,
        uid,
        first: {
          title: title1,
          file: url1,
          count: 0,
        },
        second: {
          title: title2,
          file: url2,
          count: 0,
        },
        detail,
        date: new Date().getTime() * -1,
      });
      
      await actions.setSubmitting(false);
      await history.push(location); 
    }
  },

  displayName: 'Edit',
})(Edit);

export default withEdit;