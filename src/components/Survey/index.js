import $ from 'jquery';
import { API, Storage } from 'aws-amplify';

import {Form} from 'enketo-core/src/js/form';
import axios from 'axios';

import React, {Component} from "react"
import './Survey.css';

// import data from 'https://s3.amazonaws.com/forms-app-xslx-dev/public/access.json';

class Survey extends Component {
  state = { form: '', model: ''};

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
            external: undefined,
            // external: contactSummary ? [ contactSummary ] : undefined,
          };

          $('.container').first().html($html);
          //
          const element = $('#form').find('form').first();
          const eform = new Form(element, enketoOptions);
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
          <div className="nav">
            <div id='formList'></div>
          </div>
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
                <button className="btn btn-primary" id="submit-form">
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
