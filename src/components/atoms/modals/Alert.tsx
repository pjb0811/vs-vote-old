import * as React from 'react';
import { Modal } from 'semantic-ui-react';

type Props = {
  message: string;
  open: boolean;
  close: Function;
};

class Alert extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { message, open, close } = this.props;
    return (
      <Modal size={'mini'} dimmer={'inverted'} open={open}>
        <div className="ui success message">
          <i className="close icon" onClick={() => { close(false); }}/>
          <div className="header">
           {message}
          </div>
        </div>
      </Modal>
    );
  }
}

export default Alert;