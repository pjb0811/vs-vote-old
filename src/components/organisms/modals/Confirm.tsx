import * as React from 'react';
import { Modal } from 'semantic-ui-react';

type Props = {
  message: string;
  open: boolean;
  approve: Function;
};

class Confirm extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  
  render() {
    const { open, message, approve } = this.props;
    return (
      <Modal size={'mini'} open={open}>
        <div className="ui active modal">
          <div className="content">
            <p>{message}</p>
          </div>
          <div className="actions">
            <div 
              className="ui approve button"
              onClick={() => { approve(); }}
            >
              확인
            </div>
          </div>
        </div>
      </Modal> 
    );
  }
}

export default Confirm;