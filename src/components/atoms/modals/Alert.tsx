import * as React from 'react';
import { Modal } from 'semantic-ui-react';

type Props = {
  message: string;
  isOpen: boolean;
  showModal: Function;
};

class Alert extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  
  render() {
    const { message, isOpen, showModal } = this.props;
    return (
      <Modal size={'mini'} dimmer={'inverted'} open={isOpen}>
        <div className="ui success message">
          <i className="close icon" onClick={() => { showModal(false); }}/>
          <div className="header">
           {message}
          </div>
        </div>
      </Modal> 
    );
  }
}

export default Alert;