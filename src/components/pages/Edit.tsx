import * as React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../firebase';
import Error from '../atoms/form/Error';

interface Props {
  values: Values;
  touched: {
    file1: boolean;
    file2: boolean;
  };
  errors: {
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
  title: string;
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
            <div className="field">
              <label>제목</label>
              <input 
                type="text"
                name="title"
                placeholder="title"
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
    title: '',
    file1: undefined,
    file2: undefined,
    detail: '',
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string()
      .required('제목을 입력해주세요.')
      .max(20, '20자 이하로 작성해 주세요.'),
    file1: Yup.mixed().required('파일을 등록해주세요.'),
    file2: Yup.mixed().required('파일을 등록해주세요.'),
  }),
  handleSubmit: (values: Values, actions: Actions) => {
    let file1Name, file2Name;
    if (values.file1) {
      file1Name = values.file1.name;
      if (!values.file1.name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
        actions.setErrors({ file1: '이미지 파일을 등록해주세요.' });
        return;
      }
    }

    if (values.file2) {
      file2Name = values.file2.name;
      if (!values.file2.name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
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

      console.log(uid, file1Ref.fullPath, file2Ref.fullPath);

      /*
      firebase.database().ref('list/' + key).set({
        uid,
        ...values,
      });
      */
    }

    actions.setSubmitting(false);
  },

  displayName: 'Edit',
})(Edit);

export default withEdit;