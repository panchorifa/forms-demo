import React, { Component } from 'react';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';

import Uploader from './components/Uploader/index';
import SurveyList from './components/SurveyList/index';
import Survey from './components/Survey/index';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Uploader/>
        <div className="App-content">
          <SurveyList/>
          <div className="App-survey">
            <Survey/>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App, {includeGreetings: true});
