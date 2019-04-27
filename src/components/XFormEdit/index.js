import React, {Component} from "react"
import $ from 'jquery';
import { API, Storage } from 'aws-amplify';
import {Form} from 'enketo-core/src/js/form';
import {withRouter} from 'react-router-dom';
import {getData} from '../../services/enketo';
import {getSubmission, updateSubmission} from '../../services/api';
import './XFormEdit.css';

let eform;

class XFormEdit extends Component {
  state = { loading: true, form: '', model: '', formName: null};

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const submissionId=this.props.match.params.submissionId;
    const data = {content: getData(eform)};
    console.log(data);
    const response = await updateSubmission(submissionId, data);
    console.log(response);
    this.props.history.push('/submissions');
  };

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
    const {submissionId} = this.props.match.params;
    const {formName, form, model, content} = await getSubmission(submissionId);
    this.setState({formName, form, model, loading: false});
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
  };

  render() {
    const {loading} = this.state;
    if(loading) return null;
    return (
      <div className="enketo editable" id="form">
        <div className="edit">EDIT</div>
        <div className="main">
          <div className="container pages"></div>
          <section className="form-footer end">
            <div className="form-footer__content">
              <div className="form-footer__content__main-controls">
                <button onClick={this.handleSubmit} className="btn btn-primary btn-update" id="submit-form">
                  <i className="icon icon-check"> </i>Update
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

export default withRouter(XFormEdit);
