import $ from 'jquery';
import { API, Storage } from 'aws-amplify';
import _ from 'underscore';
import {Form} from 'enketo-core/src/js/form';
import axios from 'axios';

import React, {Component} from "react"
import './Survey.css';

let eform;
// import data from 'https://s3.amazonaws.com/forms-app-xslx-dev/public/access.json';


const getRecordForCompletedForm = (form, formName) => {
  const record = form.getDataStr({ irrelevant: false });
  return {
    form: formName,
    type: 'data_record',
    content_type: 'xml',
    // reported_date: now ? now.getTime() : Date.now(),
    // contact: ExtractLineage(contact),
    // from: contact && contact.phone,
    fields: reportRecordToJs(record, form),
  };
};

/* Enketo-Translation reportRecordToJs */
const reportRecordToJs = function(record, formXml) {
  var root = $.parseXML(record).firstChild;
  if (!formXml) {
    return nodesToJs(root.childNodes);
  }
  var repeatPaths = $(formXml)
    .find('repeat[nodeset]')
    .map(function() {
      return $(this).attr('nodeset');
    })
    .get();
  return nodesToJs(root.childNodes, repeatPaths, '/' + root.nodeName);
};

const nodesToJs = function(data, repeatPaths, path) {
  repeatPaths = repeatPaths || [];
  path = path || '';
  var result = {};
  withElements(data)
    .each(function(n) {
      var dbDocAttribute = n.attributes.getNamedItem('db-doc');
      if (dbDocAttribute && dbDocAttribute.value === 'true') {
        return;
      }

      var typeAttribute = n.attributes.getNamedItem('type');
      var updatedPath = path + '/' + n.nodeName;
      var value;

      var hasChildren = withElements(n.childNodes).size().value();
      if(hasChildren) {
        value = nodesToJs(n.childNodes, repeatPaths, updatedPath);
      } else if (typeAttribute && typeAttribute.value === 'binary') {
        // this is attached to the doc instead of inlined
        value = '';
      } else {
        value = n.textContent;
      }

      if (repeatPaths.indexOf(updatedPath) !== -1) {
        if (!result[n.nodeName]) {
          result[n.nodeName] = [];
        }
        result[n.nodeName].push(value);
      } else {
        result[n.nodeName] = value;
      }
    });
  return result;
};

function withElements(nodes) {
  return _.chain(nodes)
    .filter(function(n) {
      return n.nodeType === Node.ELEMENT_NODE;
    });
}


class Survey extends Component {
  state = { form: '', model: ''};

  handleSubmit(event) {
    event.preventDefault();
    console.log(eform);
    console.log(getRecordForCompletedForm(eform, 'some-name'));
  }

  bindDataToModel(model, data) {
    // const xmlModel = $($.parseXML(model));
    // const bindRoot = xmlModel.find('model instance').children().first();
    //
    // const userRoot = bindRoot.find('>inputs>user');
    // if (data) {
    //   bindJsonToXml(bindRoot, data, function(name) {
    //     // Either a direct child or a direct child of inputs
    //     return '>%, >inputs>%'.replace(/%/g, name);
    //   });
    // }
    //
    // // if (userRoot.length) {
    // //   EnketoTranslation.bindJsonToXml(userRoot, user);
    // // }
    //
    // return new XMLSerializer().serializeToString(bindRoot[0]);
  };


  async componentDidMount() {

    Storage.get('access.json')
      .then(url => {
        axios.get(url).then(data => {
          const {form, model} = data.data;
          this.setState({form, model});

          const content = {};
          const $html = $(form);
          const enketoOptions = {
            modelStr: model,
            instanceStr: this.bindDataToModel(model, content),
            external: undefined
          };

          $('.container').replaceWith($html);

          const element = $('#form').find('form').first();
          eform = new Form(element, enketoOptions);
          const loadErrors = eform.init();
          if (loadErrors && loadErrors.length) {
            console.log('Load Errors', JSON.stringify(loadErrors));
            // return -1;
          }
        })
      })
      .catch(err => {
        console.log('Error downloading file!', err);
      });
  }

  render() {
    return (
      <div className="enketo" id="form">
        <ul>
          <li><p>Survey Form</p></li>
          <li>Survey Submissions</li>
        </ul>
        <div className="main">
          <div className="container pages"></div>

          <section className="form-footer end">
            <div className="form-footer__content">
              <div className="form-footer__content__main-controls">
                <fieldset className="draft question simple-select">
                  <div className="option-wrapper">
                    <label className="select">
                      <input className="ignore" type="checkbox" name="draft"/>
                      <span className="option-label">Save as Draft</span>
                    </label>
                  </div>
                </fieldset>
                <button onClick={this.handleSubmit} className="btn btn-primary" id="submit-form">
                  <i className="icon icon-check"> </i>Submit
                </button>
                <a className="btn btn-primary next-page disabled" href="#">Next</a>
              </div>
              <div className="footer-nav">
              <div className="form-footer__content__jump-nav">
                <a className="btn btn-default first-page" href="#">Return to Beginning</a>
                <a className="btn btn-default last-page disabled" href="#">Go to End</a>
              </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default Survey;
