import React, {Component} from 'react';
import {getSubmission} from '../../services/api';
// import {getData} from '../../services/enketo';

class EModel extends Component {
  state = {submission: null, form: null, model: null};

  async componentDidMount() {
    const {submissionId} = this.props.match.params;
    const submission = await getSubmission(submissionId);
    this.setState({submission});
  }

  render() {
    return (
      <div></div>
    )
  }
}

export default EModel;
