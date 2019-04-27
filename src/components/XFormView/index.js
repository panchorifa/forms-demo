import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {getSubmission} from '../../services/api';
import './XFormView.css';

const IGNORED_KEYS=['deviceid', 'start', 'end', 'today', 'instanceID'];

const getValues = (content, values=[]) => {
  Object.keys(content)
  .filter(k => !IGNORED_KEYS.includes(k))
  .map(key => {
    const value = content[key];
    if(typeof value === 'string' && value.length) {
      values.push([key, value]);
    } else if(typeof value === 'object') {
      getValues(value, values);
    }
  });
  return values;
}

class XFormView extends Component {
  state = {loading: true, values: []};

  async componentDidMount() {
    const {submissionId} = this.props.match.params;
    const {formName, content} = await getSubmission(submissionId);
    const values = getValues(content);
    this.setState({formName, submissionId, values, loading: false});
  }

  render() {
    const {formName, submissionId, loading, values} = this.state;
    if(loading) return null;
    return (
      <div className="form-view card-body">
				<div className="list-group m-b-0">
					<div className="list-group-item active">Form: <NavLink to={`/forms/${formName}`}><b>{formName}</b></NavLink>
            <div className="list-group-title">Submission: <NavLink to={`/edit/${submissionId}`}><b>{submissionId}</b></NavLink></div>
            <div className="list-group-title">Enketo Form: <NavLink to={`/eforms/${submissionId}`}><b>enketo form</b></NavLink></div>
            <div className="list-group-title">Enketo Model: <NavLink to={`/models/${submissionId}`}><b>enketo model</b></NavLink></div>
          </div>
          {values.map((r, idx) =>
					  <div key={`field${idx}`} className="list-group-item text-left">{r[0]} <div className="value">{r[1]}</div></div>
          )}
				</div>
			</div>
    )
  }
}

export default XFormView;

// {content[field].length > 1 && Object.keys(content[field]).map((subfield, subIdx) =>
//   <div key={`field${idx}-${subIdx}`} className="list-group-item text-left"> >> {subfield}</div>
// )}
