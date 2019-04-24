import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';

class Submissions extends Component {
  state = {error: null, submissions: []};

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    axios({
      method: 'GET',
      url:'https://yqtqjifgk0.execute-api.us-east-1.amazonaws.com/dev/xsubmissions'
    })
    .then(response => {
      this.setState({submissions: response.data});
    })
    .catch(err => {
      this.setState({error: err, submissions: []});
    });
  }

  handleDelete(submissionId) {
    axios({
      method: 'DELETE',
      url:`https://yqtqjifgk0.execute-api.us-east-1.amazonaws.com/dev/xsubmissions/${submissionId}`
    })
    .then(response => {
      console.log(response);
      // this.setState({submissions: response.data});
    })
    .catch(err => {
      console.log(err);
      // this.setState({error: err, submissions: []});
    });
  }

  render() {
    const {submissions} = this.state;

    return (
      <div className="card m-b-15">
        <div className="card-header card-header-inverse">
          <h4 className="card-header-title text-left">Submissions</h4>
          <div className="card-header-btn">
            <a href="#" data-toggle="card-expand" className="btn btn-success"><i className="fa fa-expand"></i></a>
            <a href="#" data-toggle="card-refresh" className="btn btn-warning"><i className="fa fa-redo"></i></a>
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
              {submissions.map((submission, i) =>
                <tr key={`submission-${i}`}>
                  <td className="text-left">{submission.form}</td>
                  <td className="text-center">admin</td>
                  <td className="text-left">12/12/19</td>
                  <td className="text-left">12/12/19</td>
                  <td className="btn-col text-right">
                    <NavLink to={`/submissions/${submission.id}`} href="#" className="btn btn-default btn-xs m-r-2"><i className="fa fa-edit"></i></NavLink>
                    <a href="#" className="btn btn-default btn-xs m-r-2"><i className="fa fa-list-ol"></i></a>
                    <a href="#" onClick={() => this.handleDelete(submission.id)} className="btn btn-default btn-xs"><i className="fa fa-times"></i></a>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Submissions;
