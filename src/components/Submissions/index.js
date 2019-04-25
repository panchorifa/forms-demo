import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Moment from 'react-moment';
import axios from 'axios';

const API = 'https://yqtqjifgk0.execute-api.us-east-1.amazonaws.com/dev';

const getSubmissions = async () => {
  try {
    const res = await axios({method: 'GET', url: `${API}/xsubmissions`});
    return res.data.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch(err) {
    console.log(err);
    return [];
  }
};

const deleteSubmission = async (id) => {
  try {
    await axios({method: 'DELETE', url: `${API}/xsubmissions/${id}`});
  } catch(err) {
    console.log(err);
  }
};

class Submissions extends Component {
  state = {error: null, submissions: [], loading: true};

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    this.setState({submissions: await getSubmissions(), loading: false});
  }

  async handleDelete(submissionId) {
    await deleteSubmission(submissionId);
    this.setState({submissions: await getSubmissions()});
  }

  render() {
    const {submissions, loading} = this.state;
    if(loading) return null;
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
          {submissions.length === 0 &&
            <div>
              <br/>
              <p className="f-s-12 text-muted">You do not have any submissions.</p>
            </div>
          }
          {submissions.length > 0 &&
            <table className="table table-striped m-b-0">
              <thead>
                <tr>
                  <th className="text-left">LAST UPDATED</th>
                  <th className="text-left">DATE CREATED</th>
                  <th className="text-left">FORM</th>
                  <th className="text-center">USER</th>
                  <th className="text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission, i) =>
                  <tr key={`submission-${i}`}>
                    <td className="text-left">
                      <Moment format="YYYY-MM-DD HH:mm">{submission.updatedAt}</Moment>
                    </td>
                    <td className="text-left">
                      <Moment format="YYYY-MM-DD HH:mm">{submission.createdAt}</Moment>
                    </td>
                    <td className="text-left">{submission.form}</td>
                    <td className="text-center">admin</td>
                    <td className="btn-col text-right">
                      <NavLink to={`/submissions/${submission.id}`} href="#" className="btn btn-default btn-xs m-r-2"><i className="fa fa-edit"></i></NavLink>
                      <a onClick={() => this.handleDelete(submission.id)} className="btn btn-default btn-xs"><i className="fa fa-times"></i></a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          }
        </div>
      </div>
    )
  }
}

export default Submissions;
