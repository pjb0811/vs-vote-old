import * as React from 'react';
import Alert from 'components/organisms/modals/Alert';
import { Props, State } from 'interface/atoms/buttons/AuthLoginGroup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'redux/actions/user';

class AuthLoginGroup extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      alert: {
        message: '',
        open: false,
        type: ''
      }
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { history, user, UserActions } = this.props;
    const { isVerifing, success } = user.toJS().data;
    if (success) {
      const location = {
        pathname: '/'
      };
      UserActions.resetUserVerify();
      history.push(location);
    } else {
      if (isVerifing) {
        UserActions.resetUserVerify();
      }
    }
  }

  closeAlert() {
    this.setState((prevState, props) => {
      return {
        alert: {
          ...prevState.alert,
          open: false
        }
      };
    });
  }

  render() {
    const { className, children, UserActions } = this.props;
    const { alert } = this.state;
    const childrenWithProps = React.Children.map(
      children,
      (child: React.ReactElement<any>) => {
        return React.cloneElement(child, {
          ...child.props,
          signInWithAuth: UserActions.requestSignInWithAuth
        });
      }
    );

    return (
      <div className={className}>
        {childrenWithProps}
        <Alert
          message={alert.message}
          open={alert.open}
          type={alert.type}
          onClose={() => {
            this.closeAlert();
          }}
        />
      </div>
    );
  }
}

export default connect(
  (state: Props) => ({
    user: state.user
  }),
  dispatch => ({
    UserActions: bindActionCreators(
      userActions as Props['UserActions'],
      dispatch
    )
  })
)(AuthLoginGroup);
