import * as React from 'react';
import { withFormik, FormikErrors } from 'formik';
import firebase from 'firebaseApp';
import Error from '../atoms/form/Error';
import Alert from '../organisms/modals/Alert';
import withAuth from '../hoc/auth';
import { Props, State, Values, Actions } from 'interface/pages/Post';

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
        open
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
        <h2 className="ui teal center aligned header">Post</h2>
        <form className="ui large form error">
          <div className="ui segment">
            <h4 className="ui dividing header">Title</h4>
            <div className="fields">
              <div
                className={`seven wide ${
                  errors.title1 && touched.title1 ? 'field error' : 'field'
                }`}
              >
                <input
                  type="text"
                  name="title1"
                  placeholder="First title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Error errors={errors} touched={touched} field="title1" />
              </div>
              <div className="two wide field">
                <strong>VS</strong>
              </div>
              <div
                className={`seven wide ${
                  errors.title2 && touched.title2 ? 'field error' : 'field'
                }`}
              >
                <input
                  type="text"
                  name="title2"
                  placeholder="Second title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Error errors={errors} touched={touched} field="title2" />
              </div>
            </div>
            <h4 className="ui dividing header">Image</h4>
            <div className="fields">
              <div
                className={`seven wide ${
                  errors.file1 && touched.file1 ? 'field error' : 'field'
                }`}
              >
                <input
                  type="file"
                  name="file1"
                  placeholder="First image"
                  onChange={(e: React.ChangeEvent<any>) => {
                    setFieldValue('file1', e.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                />
                <Error errors={errors} touched={touched} field="file1" />
              </div>
              <div className="two wide field">
                <strong>VS</strong>
              </div>
              <div
                className={`seven wide ${
                  errors.file2 && touched.file2 ? 'field error' : 'field'
                }`}
              >
                <input
                  type="file"
                  name="file2"
                  placeholder="Image2"
                  onChange={(e: React.ChangeEvent<any>) => {
                    setFieldValue('file2', e.currentTarget.files[0]);
                  }}
                  onBlur={handleBlur}
                />
                <Error errors={errors} touched={touched} field="file2" />
              </div>
            </div>
            <h4 className="ui dividing header">Detail</h4>
            <div className="field">
              <textarea
                name="detail"
                placeholder="Detail"
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              className="ui fluid large teal submit button"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              Submit
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
              pathname: '/'
            };
            history.push(location);
          }}
        />
      </div>
    );
  }
}

const withPost = withFormik({
  mapPropsToValues: props => ({
    title1: '',
    title2: '',
    file1: undefined,
    file2: undefined,
    detail: ''
  }),
  validate: (values: Values, props) => {
    const errors: FormikErrors<Values> = {};
    const regex = /\.(gif|jpg|jpeg|tiff|png)$/i;

    if (!values.title1) {
      errors.title1 = 'Please enter the first title.';
    } else {
      if (values.title1.length > 20) {
        errors.title1 = 'Please fill in 20 characters or less.';
      }
    }

    if (!values.title2) {
      errors.title2 = 'Please enter the first title.';
    } else {
      if (values.title2.length > 20) {
        errors.title2 = 'Please fill in 20 characters or less.';
      }
    }

    if (!values.file1) {
      errors.file1 = 'Please upload the file.';
    } else {
      if (!values.file1.name.match(regex)) {
        errors.file1 = 'Please upload an image file.';
      }
    }

    if (!values.file2) {
      errors.file2 = 'Please upload the file.';
    } else {
      if (!values.file2.name.match(regex)) {
        errors.file2 = 'Please upload an image file.';
      }
    }

    return errors;
  },
  handleSubmit: async (values: Values, actions: Actions) => {
    const { file1, file2, title1, title2, detail } = values;
    const user = firebase.auth().currentUser;
    const storageRef = firebase.storage().ref();
    const database = firebase.database();
    const key = database.ref('list').push().key;
    let uid: string = '';
    let file1Ref: any;
    let file2Ref: any;

    if (user) {
      uid = user.uid;
    }

    if (file1) {
      file1Ref = storageRef.child(`images/${key}/${file1.name}`);
    }

    if (file2) {
      file2Ref = storageRef.child(`images/${key}/${file2.name}`);
    }

    await file1Ref.put(file1);
    const url1 = await file1Ref.getDownloadURL().then((url: string) => {
      return url;
    });
    await file2Ref.put(file2);
    const url2 = await file2Ref.getDownloadURL().then((url: string) => {
      return url;
    });

    const params = {
      key,
      uid,
      first: {
        title: title1,
        file: url1,
        count: 1
      },
      second: {
        title: title2,
        file: url2,
        count: 1
      },
      detail,
      voters: {},
      date: new Date().getTime() * -1
    };

    database.ref(`list/${key}`).set(params);
    database.ref(`users/${uid}/list/${key}`).set(params);

    actions.setSubmitting(false);
    actions.setStatus({
      message: 'This post has been registered.',
      success: true,
      type: 'success'
    });
  },

  displayName: 'Post'
})(withAuth(Post));

export default withPost;
