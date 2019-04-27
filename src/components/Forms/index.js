import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Moment from 'react-moment';
import {getForms, deleteForm} from '../../services/api';

class Forms extends Component {
  state = {forms: [], loading: true};

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  async componentDidMount() {
    this.setState({forms: await getForms(), loading: false});
  }

  async handleDelete(formId) {
    await deleteForm(formId);
    this.setState({forms: await getForms()});
  }

  async handleRefresh() {
    this.setState({forms: await getForms()});
  }

  render() {
    const {forms, loading} = this.state;
    if(loading) return null;
    return (
      <div className="card m-b-15">
        <div className="card-header card-header-inverse">
          <h4 className="card-header-title text-left">XForms</h4>
          <div className="card-header-btn">
            <a href="#" data-toggle="card-expand" className="btn btn-success"><i className="fa fa-expand"></i></a>
            <a onClick={() => this.handleRefresh()} data-toggle="card-refresh" className="btn btn-warning"><i className="fa fa-redo"></i></a>
          </div>
        </div>
        <div className="card-body">
          {forms.length === 0 &&
            <div>
              <br/>
              <p className="f-s-12 text-muted">You do not have any xforms.</p>
            </div>
          }
          {forms.length > 0 &&
            <table className="table table-striped m-b-0">
              <thead>
                <tr>
                  <th className="text-left">LAST UPDATED</th>
                  <th className="text-left">DATE CREATED</th>
                  <th className="text-left">NAME</th>
                  <th className="text-center">SUBMISSIONS</th>
                  <th className="text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {forms.map((form, i) =>
                  <tr key={`tr-form-${i}`}>
                    <td className="text-left">
                      <Moment format="YYYY-MM-DD HH:mm">{form.updatedAt}</Moment>
                    </td>
                    <td className="text-left">
                      <Moment format="YYYY-MM-DD HH:mm">{form.createdAt}</Moment>
                    </td>
                    <td className="text-left">{form.id}</td>
                    <td className="text-center">
                      <NavLink to={`/forms/${form.id}/submissions`}>{form.submissions}</NavLink>
                    </td>
                    <td className="btn-col text-right">
                      <NavLink to={`/forms/${form.id}`} className="btn btn-default btn-xs m-r-2"><i className="fa fa-reply" title="submit"></i></NavLink>
                      <a href="#inverse-modal" data-toggle="modal" xonClick={() => this.handleDelete(form.id)} className="btn btn-default btn-xs"><i className="fa fa-times" title="delete"></i></a>
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

export default Forms;
