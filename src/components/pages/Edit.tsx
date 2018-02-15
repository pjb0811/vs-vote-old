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

class Edit extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
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
                <label>제목 1</label>
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
                <label>제목 2</label>
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
              <div className={`eight wide ${errors.file1 && touched.file1 ? 'field error' : 'field'}`}>
                <label>이미지 1</label>
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
              <div className={`eight wide ${errors.file2 && touched.file2 ? 'field error' : 'field'}`}>
                <label>이미지 2</label>
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
              <label>세부 내용</label>
              <textarea name="detail" onChange={handleChange}/>
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
    const { title1, title2, file1, file2, detail } = values;
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

    const key = firebase.database().ref().child('list').push().key;
    const user = firebase.auth().currentUser;

    if (user) {
      const { uid } = user;
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const file1Ref = storageRef.child(`images/${key}/${file1Name}`);
      const file2Ref = storageRef.child(`images/${key}/${file2Name}`);

      firebase.database().ref('list/' + key).set({
        uid,
        file1: file1Ref.fullPath,
        file2: file2Ref.fullPath,
        title1,
        title2,
        detail,
      });
    }
    actions.setSubmitting(false);
  },

  displayName: 'Edit',
})(Edit);

export default withEdit;