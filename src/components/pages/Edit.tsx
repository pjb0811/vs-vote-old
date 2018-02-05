import * as React from 'react';
// import firebase from '../../firebase';

class Edit extends React.Component {
  /* componentWillMount() {
    const storage = firebase.storage();
    console.log(storage);
  } */

  render() {
    return (
      <div className="ui container">
        <h2 className="ui teal center aligned header">VS 등록하기</h2>
        <form
          className="ui large form error"
        >
          <div className="ui segment">
            <div className="fields">
              <div className="eight wide field">
                <label>이미지 1</label>
                <input 
                  type="file" 
                  placeholder="Image1"
                />
              </div>
              <div className="eight wide field">
                <label>이미지 2</label>
                <input type="file" placeholder="Image2"/>
              </div>
            </div>
            <div className="field">
              <label>세부 내용</label>
              <textarea/>
            </div>
            <button
              type="button"
              className="ui fluid large teal submit button"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Edit;