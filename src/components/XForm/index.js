import $ from 'jquery';
import {Form} from 'enketo-core/src/js/form';
import {withRouter} from 'react-router-dom';
import { Storage } from 'aws-amplify';
import React, {Component} from "react"
import {getData} from '../../services/enketo';
import {bindDataToModel} from '../../services/enketo-form';
import {getForm, addSubmission} from '../../services/api';
import {getExternalData} from '../../services/external';
import fileManager from 'enketo-core/src/js/file-manager';
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
      content: getData(eform),
      // dataStr: eform.getDataStr() --- explore this???
    };
    const files = fileManager.getCurrentFiles();
    await Promise.all(files.map(blob => {
      return Storage.put(blob.name, new File([blob], blob.name));
    }));
    if(await addSubmission(data)) {
      this.props.history.push('/submissions');
    }
  }

  async componentDidMount() {
    const formName = this.props.match.params.form;
    const {form, model} = await getForm(formName);
    this.setState({form, model, loading: false, formName});
    const $html = $(form);
    const instanceStr = bindDataToModel(model, {});

    const enketoOptions = {
      modelStr: model,
      instanceStr: bindDataToModel(model, {}),
      external: getExternalData(model)
    };
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
