import React, {Component} from 'react';

class Table extends Component {
  render() {
    return (
      <div className="card m-b-15">
        <div className="card-header card-header-inverse">
          <h4 className="card-header-title">Forms</h4>
          <div className="card-header-btn">
            <a href="#" data-toggle="card-expand" className="btn btn-success"><i className="fa fa-expand"></i></a>
            <a href="#" data-toggle="card-refresh" className="btn btn-warning"><i className="fa fa-redo"></i></a>
            <a href="#" data-toggle="card-remove" className="btn btn-danger"><i className="fa fa-trash-alt"></i></a>
          </div>
        </div>
        <div className="card-body">
          <p className="f-s-12 text-muted">The form status goes from xslx(<code>excel</code>), xml(<code>xform</code>) to json<code>enketo</code>.</p>
          <table className="table table-striped m-b-0">
            <thead>
              <tr>
                <th>NAME</th>
                <th>STATUS</th>
                <th>DATE CREATED</th>
                <th>LAST UPDATED</th>
                <th>SUBMISSIONS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>xslx</td>
                <td>Access</td>
                <td>12/12/19</td>
                <td>12/12/19</td>
                <td>0</td>
                <td></td>
              </tr>
              <tr>
                <td>xform</td>
                <td>Combined</td>
                <td>12/12/19</td>
                <td>12/12/19</td>
                <td>0</td>
                <td></td>
              </tr>
              <tr>
                <td>json</td>
                <td>Coordination</td>
                <td>11/11/19</td>
                <td>11/11/19</td>
                <td>0</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Table;
