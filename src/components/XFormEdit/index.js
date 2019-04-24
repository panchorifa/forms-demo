import $ from 'jquery';
import { API, Storage } from 'aws-amplify';
import _ from 'underscore';
import {Form} from 'enketo-core/src/js/form';
import axios from 'axios';

import React, {Component} from "react"
import './XFormEdit.css';

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

class XFormEdit extends Component {
  state = { loading: true, form: '', model: '', formName: null};

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {
      form: this.state.formName,
      fields: getData(eform)
    };

    axios({
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      url:'https://yqtqjifgk0.execute-api.us-east-1.amazonaws.com/dev/xsubmissions',
      data: JSON.stringify(data),
      json: true
    })
    .then(response => {
      console.log(response);
      // this.setState({submissions: response.data});
    })
    .catch(err => {
      console.log(err);
      // this.setState({error: err, submissions: []});
    });
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

  // getFormName() {
  //   let {pathname} = this.props.location;
  //   return pathname.substr(pathname.lastIndexOf('/')+1);
  // }

  async componentDidMount() {
    const {submissionId} = this.props.match.params;
    console.log(submissionId);
    axios.get(`https://yqtqjifgk0.execute-api.us-east-1.amazonaws.com/dev/xsubmissions/${submissionId}`)
      .then(response => {
        const formName = response.data.form;
        const fields = JSON.parse(response.data.fields);

        Storage.get(`${formName}.json`)
          .then(url => {
            axios.get(url).then(data => {
              const {form, model} = data.data;
              this.setState({form, model, loading: false, formName});
              const content = fields;
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
      })
  }

  render() {
    const {loading} = this.state;
    if(loading) {
      return null;
    }
    return (
      <div className="enketo editable" id="form">
        <div className="edit">EDIT</div>
        <div className="main">
          <div className="container pages"></div>
          <section className="form-footer end">
            <div className="form-footer__content">
              <div className="form-footer__content__main-controls">
                <button onClick={this.handleSubmit} className="btn btn-primary" id="submit-form">
                  <i className="icon icon-check"> </i>Submit
                </button>
                <a className="btn btn-default previous-page disabled" href="#">Prev</a>
                <a className="btn btn-primary next-page disabled" href="#">Next</a>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default XFormEdit;
