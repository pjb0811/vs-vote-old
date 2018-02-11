import * as React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import firebase from '../../firebase';

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
                {
                  errors.file1 && touched.file1 &&
                  <div className="ui error message">
                    <p>{errors.file1}</p>
                  </div>
                }
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
                {
                  errors.file2 && touched.file2 &&
                  <div className="ui error message">
                    <p>{errors.file2}</p>
                  </div>
                }
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
    file1: undefined,
    file2: undefined,
    detail: '',
  }),
  validationSchema: Yup.object().shape({
    file1: Yup.mixed().required('파일을 등록해주세요.'),
    file2: Yup.mixed().required('파일을 등록해주세요.'),
  }),
  handleSubmit: (values: Values, actions: Actions) => {
    if (values.file1) {
      if (!values.file1.name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
        actions.setErrors({ file1: '이미지 파일을 등록해주세요.' });
        return;
      }
    }

    if (values.file2) {
      if (!values.file2.name.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) {
        actions.setErrors({ file2: '이미지 파일을 등록해주세요.' });
        return;
      }
    }

    // const key = firebase.database().ref().child('list').push().key;
    const user = firebase.auth().currentUser;
    console.log(user);
    
    /* firebase.database().ref('list/' + key).set({
      ...values,
    });  */
   
    actions.setSubmitting(false);
  },

  displayName: 'Edit',
})(Edit);

export default withEdit;