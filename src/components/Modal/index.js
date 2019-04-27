import React, {Component} from 'react';


class Modal extends Component {
  render() {
    return (
      <div className="modal modal-inverse fade" id="inverse-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Inverse Modal Title</h4>
              <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
            </div>
            <div className="modal-body">
              <p>One fine body&hellip;</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-white" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;
