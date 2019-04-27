import $ from 'jquery';
import { API, Storage } from 'aws-amplify';
import {Form} from 'enketo-core/src/js/form';
import {withRouter} from 'react-router-dom';
import React, {Component} from "react"
import {getData} from '../../services/enketo';
import {getForm, addSubmission} from '../../services/api';
import './XForm.css';

let eform;

class XForm extends Component {
  state = { loading: true, form: '', model: '', formName: null};

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = {
      form: this.state.formName,
      content: getData(eform)
    };
    if(await addSubmission(data)) {
      this.props.history.push('/submissions');
    }
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

  getFormName() {
    let {pathname} = this.props.location;
    return pathname.substr(pathname.lastIndexOf('/')+1);
  }

  async componentDidMount() {
    const formName = this.props.match.params.form;
    const {form, model} = await getForm(formName);
    this.setState({form, model, loading: false, formName});
    const content = {}
    const $html = $(form);
    const enketoOptions = {
      modelStr: model,
      instanceStr: this.bindDataToModel(model, content),
      external: undefined
    };
    console.log($html);
    console.log('================================');
    console.log(model);
    console.log('================================');
    console.log(content);
    $('.container').replaceWith($html);
    const element = $('#form').find('form').first();
    eform = new Form(element, enketoOptions);
    const loadErrors = eform.init();
    if (loadErrors && loadErrors.length) {
      console.log('Load Errors', JSON.stringify(loadErrors));
    }
  }

  render() {
    const {loading} = this.state;
    if(loading) {
      return null;
    }
    return (
      <div className="enketo" id="form">
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

export default withRouter(XForm);
