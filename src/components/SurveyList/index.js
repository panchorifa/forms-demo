import React, {Component} from "react"
import { API, Storage } from 'aws-amplify';
import './SurveyList.css';

class SurveyList extends Component {
  state = { forms: [], fileUrl: '', file: '', fileName: ''};

  async componentDidMount() {
    const data = await API.get('forms', '/forms');
    this.setState({forms: data.forms});
  }

  render() {
    return (
      <div className="Survey-List">
        <h4>Surveys</h4>
        <table>
          <tbody>
            {
              this.state.forms.map((form, i) => (
                <tr key={form.id}>
                  <td>{form.id}</td>
                  <td>{form.status}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default SurveyList;
