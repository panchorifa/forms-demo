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

const findLabel = (form, id) => {
  return $(form).find(`*[data-itext-id="/${id}:label"]`).text();
};

const findInputType = (form, id) => {
  return $(form).find(`input[name="/${id}"]`).attr('type');
};

const findYesNoPair = (form, id, value) => {
  if(id.endsWith('Present')) {
    id = id.substring(0, id.indexOf('Present')) + 'Label';
  }
  const label = findLabel(form, id);
  value = value === 'Y' ? 'Yes' : value === 'N' ? 'No' : value;
  return [label, value];
};

const getLabel = (form, pair) => {
  let [id, value] = pair;
  let label = findLabel(form, id);

  const inputType = findInputType(form, id);
  if(inputType==='hidden') return null;

  if(label === 'Yes/No') {
    [label, value] = findYesNoPair(form, id, value);
  } else {
    const inputType = $(form).find(`input[name="/${id}"]`).attr('type');
    if(!['Y', 'N'].includes(value)) {
      if(['radio'].includes(inputType)) {
        value = findLabel(form, `${id}/${value}`);
      } else if(['checkbox'].includes(inputType)) {
        value = value.split(' ')
          .map(v => findLabel(form, `${id}/${v}`))
          .join(' ');
      } else if(!label && ['number'].includes(inputType)) {
        label = findLabel(form, `${id}Label`);
      } else if(!label) {
        // console.log(inputType)
        // console.log(id)
        // console.log('-------------------------------')
        id = id.substring(0, id.lastIndexOf('/'));
        // console.log(id)
        label = findLabel(form, id);
      }
    }
  }
  value = value === 'Y' ? 'Yes' : value === 'N' ? 'No' : value;

  // if(id.endsWith('File')) {
  //   value = 'https://s3-us-west-2.amazonaws.com/mockerymocks/un.png';
  // }

  return [label || id, value, id];
};

class XFormView extends Component {
  state = {loading: true, values: []};

  async componentDidMount() {
    const {submissionId} = this.props.match.params;
    const {form, formName, content} = await getSubmission(submissionId);
    // console.log('======================================');
    // console.log(form);
    // console.log('======================================');
    const values = getValues(content, formName)
      .map(pair => getLabel(form, pair))
      .filter(value => value);
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
          </div>
          {values.map((r, idx) =>
					  <div key={`field${idx}`} className="list-group-item text-left">
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

// <div className="list-group-title">Enketo Form: <NavLink to={`/eforms/${submissionId}`}><b>enketo form</b></NavLink></div>
// <div className="list-group-title">Enketo Model: <NavLink to={`/models/${submissionId}`}><b>enketo model</b></NavLink></div>
