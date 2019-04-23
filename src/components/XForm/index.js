import $ from 'jquery';
import { API, Storage } from 'aws-amplify';
import _ from 'underscore';
import {Form} from 'enketo-core/src/js/form';
import axios from 'axios';

import React, {Component} from "react"
import './XForm.css';

let eform;
// import data from 'https://s3.amazonaws.com/forms-app-xslx-dev/public/access.json';

const getData = (form) => {
  const record = form.getDataStr({ irrelevant: false });
  var root = $.parseXML(record).firstChild;
  var repeatPaths = $(form)
    .find('repeat[nodeset]')
    .map(() => {
      return $(this).attr('nodeset');
    })
    .get();
  return nodesToJs(root.childNodes, repeatPaths, '/' + root.nodeName);
};

const nodesToJs = (data, repeatPaths, path) => {
  repeatPaths = repeatPaths || [];
  path = path || '';
  const result = {};
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

class XForm extends Component {
  state = { loading: true, form: '', model: ''};

  handleSubmit(event) {
    event.preventDefault();
    console.log(getData(eform));
  }

  bindDataToModel(model, data) {
    const xmlModel = $($.parseXML(model));
    const bindRoot = xmlModel.find('model instance').children().first();
    const userRoot = bindRoot.find('>inputs>user');
    if (data) {
      const bindJsonToXml = (elem, data, childMatcher) => {
        const findCurrentElement = (elem, name, childMatcher) => {
          return childMatcher ? elem.find(childMatcher(name)) : elem.children(name);
        };
        Object.keys(data).map(key => [key, data[key]])
          .forEach(function(pair) {
            const current = findCurrentElement(elem, pair[0], childMatcher);
            const value = pair[1];
            if (typeof value === 'object') {
              if(current.children().length) {
                bindJsonToXml(current, value);
              } else {
                current.text(value._id);
              }
            } else {
              current.text(value);
            }
          });
      };
      bindJsonToXml(bindRoot, data, function(name) {
        return '>%, >inputs>%'.replace(/%/g, name);
      });
    }
    return new XMLSerializer().serializeToString(bindRoot[0]);
  };

  async componentDidMount() {
    let {pathname} = this.props.location;
    pathname = pathname.substr(pathname.lastIndexOf('/')+1);
    console.log(`${pathname}.json`);
    Storage.get(`${pathname}.json`)
      .then(url => {
        axios.get(url).then(data => {
          const {form, model} = data.data;
          this.setState({form, model, loading: false});
          const content = {
            "start": "2019-04-23T03:43:52.371-06:00",
            "end": "2019-04-23T03:43:52.387-06:00",
            "today": "2019-04-22",
            "deviceid": "deviceid not found",
            "Group_IN": {
                "IN_Note1": "",
                "IN_Note2": "",
                "IN_Form": "A"
              },
              "Group_ID": {
                "ID_LabelCA": "",
                "ID_FirstName1": "aaa",
                "ID_LastName1": "bbb",
                "ID_Function1": "cccc",
                "ID_Email1": "dddd",
                "ID_Phone1": "eeee",
                "ID_Operation": "PHL"
              },
              "Group_ACC": {
                "ACC_IntroNote": "",
                "ACC_Mechanism": "N",
                "Group_ACCMatrix": {
                  "ACC_MatrixNote": "",
                  "ACC_Matrix1Note": "",
                  "ACC_Matrix1Label": "",
                  "ACC_Matrix1Desc": "",
                  "ACC_Matrix1Present": "N",
                  "ACC_Matrix2Note": "",
                  "ACC_Matrix2Label": "",
                  "ACC_Matrix2Desc": "",
                  "ACC_Matrix2Present": "N",
                  "ACC_Matrix3Note": "",
                  "ACC_Matrix3Label": "",
                  "ACC_Matrix3Desc": "",
                  "ACC_Matrix3Present": "Y",
                  "ACC_Matrix3ImpactNote": "",
                  "ACC_Matrix3Impact": "fdsfsdfsdfsdfsd",
                  "ACC_Matrix4Note": "",
                  "ACC_Matrix4Label": "",
                  "ACC_Matrix4Desc": "",
                  "ACC_Matrix4Present": "N",
                  "ACC_Matrix5Note": "",
                  "ACC_Matrix5Label": "",
                  "ACC_Matrix5Desc": "",
                  "ACC_Matrix5Present": "N",
                  "ACC_Matrix6Note": "",
                  "ACC_Matrix6Label": "",
                  "ACC_Matrix6Desc": "",
                  "ACC_Matrix6Present": "N",
                  "ACC_Matrix7Note": "",
                  "ACC_Matrix7Label": "",
                  "ACC_Matrix7Desc": "",
                  "ACC_Matrix7Present": "N",
                  "ACC_Matrix8Note": "",
                  "ACC_Matrix8Label": "",
                  "ACC_Matrix8Desc": "",
                  "ACC_Matrix8Present": "N",
                  "ACC_Matrix9Note": "",
                  "ACC_Matrix9Label": "",
                  "ACC_Matrix9Desc": "",
                  "ACC_Matrix9Present": "N",
                  "ACC_Matrix10Note": "",
                  "ACC_Matrix10Label": "",
                  "ACC_Matrix10Desc": "",
                  "ACC_Matrix10Present": "N"
                },
                "Group_ACCNote": {
                  "ACC_NoteAdd": "Y",
                  "ACC_Note": "fffffff"
                }
              },
              "Group_CMC": {
                "CMC_Present": "N",
                "CMC_Comments": "ddeeeeee"
              },
              "Group_NTS": {
                "NTS_ACCLabel": "",
                "NTS_Notes": "fffffff"
              },
              "meta": {
                "instanceID": "uuid:8e21a0cd-844d-4985-8980-cc43fe72a805",
                "deprecatedID": ""
              }
          }
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
          }
        })
      })
      .catch(err => {
        console.log('Error downloading file!', err);
      });
  }

  render() {
    const {loading} = this.state;
    if(loading) {
      return null;
    }
    return (
      <div className="enketo" id="form">
        <div className="main" >
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

export default XForm;
