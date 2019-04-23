import React, {Component} from 'react';

class Submissions extends Component {
  render() {
    return (
      <div className="card m-b-15">
        <div className="card-header card-header-inverse">
          <h4 className="card-header-title text-left">Latest Submissions</h4>
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
                <th className="text-left">FORM NAME</th>
                <th className="text-center">USER</th>
                <th className="text-left">DATE CREATED</th>
                <th className="text-left">LAST UPDATED</th>
                <th className="text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">Access</td>
                <td className="text-center">admin</td>
                <td className="text-left">12/12/19</td>
                <td className="text-left">12/12/19</td>
                <td className="btn-col text-right">
                  <a href="#" className="btn btn-default btn-xs m-r-2"><i className="fa fa-edit"></i></a>
                  <a href="#" className="btn btn-default btn-xs m-r-2"><i className="fa fa-list-ol"></i></a>
                  <a href="#" className="btn btn-default btn-xs"><i className="fa fa-times"></i></a>
                </td>
              </tr>
              <tr>
                <td className="text-left">Combined</td>
                <td className="text-center">admin</td>
                <td className="text-left">12/12/19</td>
                <td className="text-left">12/12/19</td>
                <td className="btn-col text-right">
                  <a href="#" className="btn btn-default btn-xs m-r-2"><i className="fa fa-edit"></i></a>
                  <a href="#" className="btn btn-default btn-xs m-r-2"><i className="fa fa-list-ol"></i></a>
                  <a href="#" className="btn btn-default btn-xs"><i className="fa fa-times"></i></a>
                </td>
              </tr>
              <tr>
                <td className="text-left">Coordination</td>
                <td className="text-center">admin</td>
                <td className="text-left">11/11/19</td>
                <td className="text-left">11/11/19</td>
                <td className="btn-col text-right">
                  <a href="#" className="btn btn-default btn-xs m-r-2"><i className="fa fa-edit"></i></a>
                  <a href="#" className="btn btn-default btn-xs m-r-2"><i className="fa fa-list-ol"></i></a>
                  <a href="#" className="btn btn-default btn-xs"><i className="fa fa-times"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Submissions;
