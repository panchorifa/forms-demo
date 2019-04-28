import React, {Component} from "react"
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import {getData} from '../../services/enketo';
import EnketoForm from '../../services/enketo-form';
import {getSubmission, updateSubmission} from '../../services/api';
import './XFormEdit.css';

let eform;

class XFormEdit extends Component {
  state = {loading: true, form: '', model: '', formName: null};

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const submissionId=this.props.match.params.submissionId;
    const data = {content: getData(eform)};
    if(await updateSubmission(submissionId, data)) {
      this.props.history.push('/submissions');
    }
  };

  async componentDidMount() {
    const {submissionId} = this.props.match.params;
    const {formName, form, model, content} = await getSubmission(submissionId);
    this.setState({formName, form, model, loading: false});
    console.log('==============================================');
    console.log(form);
    console.log('==============================================');
    const $html = $(form);
    $('.container').replaceWith($html);
    const element = $('#form').find('form').first();
    eform = (new EnketoForm(element, model, content)).form;
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
                <button className="btn btn-default previous-page disabled">Prev</button>
                <button className="btn btn-primary next-page disabled">Next</button>
              </div>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default withRouter(XFormEdit);
