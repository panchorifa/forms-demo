import $ from 'jquery';
import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {getSubmission} from '../../services/api';
import './XFormView.css';

const IGNORED_KEYS=['deviceid', 'start', 'end', 'today', 'instanceID'];


const findCurrentElement = (elem, name, childMatcher) => {
  return childMatcher ? elem.find(childMatcher(name)) : elem.children(name);
};
// bindJsonToXml(bindRoot, data, );


const getValues = (content, context, values=[]) => {
  Object.keys(content)
  .filter(k => !IGNORED_KEYS.includes(k))
  .map(key => {
    const value = content[key];
    if(typeof value === 'string' && value.length) {
      values.push([`${context}/${key}`, value]);
    } else if(typeof value === 'object') {
      getValues(value, `${context}/${key}`, values);
    }
  });
  return values;
}

// console.log($(form).find('*[data-itext-id="/access/Group_ID/ID_FirstName:label"]').text());
                          // *[data-itext-id="access/Group_ID/ID_FirstName:label"]
                                                  
const getLabel = (form, pair) => {
  let id = pair[0];
  let value = pair[1];
  let label = $(form).find(`*[data-itext-id="/${id}:label"]`).text();
  if(label === 'Yes/No') {
    if(id.endsWith('Present')) {
      id = id.substring(0, id.indexOf('Present')) + 'Label';
    }
    label = $(form).find(`*[data-itext-id="/${id}:label"]`).text();
  } else {
    // Check for radio buttons
    const inputType = $(form).find(`input[name="/${id}"]`).attr('type');
    if(inputType === 'radio' && !['Y', 'N'].includes(value)) {
      // console.log(inputType);
      console.log(`*[data-itext-id="/${id}/${value}"]`);
      value = $(form).find(`*[data-itext-id="/${id}/${value}:label"]`).text();
    }
  }
  value = value === 'Y' ? 'Yes' : value === 'N' ? 'No' : value;
  return [label || id, value, id];
};

class XFormView extends Component {
  state = {loading: true, values: []};

  async componentDidMount() {
    const {submissionId} = this.props.match.params;
    const {form, formName, content} = await getSubmission(submissionId);
    const values = getValues(content, formName).map(pair => getLabel(form, pair));
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
					  <div key={`field${idx}`} className="list-group-item text-left">
              {r[2]}
              <br/>

              {r[0]}
              <div className="xvalue"><b>{r[1]}</b></div>
            </div>
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

// {r[2]}
// <br/>
