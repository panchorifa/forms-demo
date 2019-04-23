import React, {Component} from 'react';
import Forms from '../Forms/index';
import Submissions from '../Submissions/index';

class Home extends Component {
  render() {
    return(
      <div>
        <h1 className="page-header">
          Forms <small>upload, collect & report</small>
        </h1>
        <div className="row">
          <div className="col-xl-12 col-sm-12">
            <Forms></Forms>
          </div>
          <div className="col-xl-12 col-sm-12">
            <Submissions></Submissions>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
