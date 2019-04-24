import React, {Component} from 'react';
import axios from 'axios';

class Forms extends Component {
  state = {forms: []};

  async componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://yqtqjifgk0.execute-api.us-east-1.amazonaws.com/dev/xforms',
    })
    .then(response => {
      this.setState({forms: response.data});
    })
    .catch(err => {
      this.setState({error: err, forms: []});
    });
  }

  render() {
    const {forms} = this.state;
    return (
      <div className="card m-b-15">
        <div className="card-header card-header-inverse">
          <h4 className="card-header-title text-left">Forms</h4>
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
                <th className="text-center">SUBMISSIONS</th>
                <th className="text-left">DATE CREATED</th>
                <th className="text-left">LAST UPDATED</th>
                <th className="text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, i) =>
                <tr key={`tr-form-${i}`}>
                  <td className="text-left">{form.id}</td>
                  <td className="text-center">0</td>
                  <td className="text-left">12/12/19</td>
                  <td className="text-left">12/12/19</td>
                  <td className="btn-col text-right">
                    <a href="#" className="btn btn-default btn-xs m-r-2"><i className="fa fa-reply"></i></a>
                    <a href="#" className="btn btn-default btn-xs"><i className="fa fa-times"></i></a>
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

export default Forms;
