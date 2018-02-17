import * as React from 'react';
import { Modal } from 'semantic-ui-react';

type Props = {
  message: string;
  open: boolean;
  close: Function;
};

class Confirm extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  
  render() {
    const { open, message, close } = this.props;
    return (
      <Modal size={'mini'} open={open} onClose={() => { close(); }}>
        <div className="ui active modal">
          <div className="content">
            <p>{message}</p>
          </div>
        </div>
      </Modal> 
    );
  }
}

export default Confirm;