import React, {Component} from 'react';
import Forms from '../Forms/index';

class Home extends Component {
  render() {
    return(
      <div>
        <div className="row">
          <div className="col-xl-12 col-sm-12">
            <Forms></Forms>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
