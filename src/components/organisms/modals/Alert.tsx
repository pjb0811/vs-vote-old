import * as React from 'react';
import { Modal } from 'semantic-ui-react';

type Props = {
  message: string;
  open: boolean;
  type: string;
  onClose: Function;
};

class Alert extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { message, open, type, onClose } = this.props;
    return (
      <Modal size={'mini'} dimmer={'inverted'} open={open}>
        <div className={`ui ${type} message`}>
          <i className="close icon" onClick={() => { onClose(); }}/>
          <div className="header">{''}</div>
          <p>{message}</p>
        </div>
      </Modal>
    );
  }
}

export default Alert;