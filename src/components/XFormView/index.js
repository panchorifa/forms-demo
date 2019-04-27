import React, {Component} from 'react';
import {Storage} from 'aws-amplify';
import axios from 'axios';

class XFormView extends Component {
  async componentDidMount() {
    const {submissionId} = this.props.match.params;
    axios.get(`https://yqtqjifgk0.execute-api.us-east-1.amazonaws.com/dev/xsubmissions/${submissionId}`)
      .then(response => {
        const formName = response.data.form;
        let content = {};
        if(response.data.content) {
          content = JSON.parse(response.data.content);
        }

        Storage.get(`${formName}.json`)
          .then(url => {
            axios.get(url).then(data => {
              const {form, model} = data.data;
              this.setState({form, model, content, loading: false, formName});
            });
          })
          .catch(err => {
            console.log('Error downloading file!', err);
          });
      })
  }

  render() {
    return (
      <div className="form-view card-body">
				<div className="list-group m-b-0">
					<div className="list-group-item active">Active Link Item</div>
					<div className="list-group-item text-left">Without link</div>
				</div>
			</div>
    )
  }
}

export default XFormView;
