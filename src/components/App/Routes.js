import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from '../Home';
import Submissions from '../Submissions';
import Upload from '../Uploader';
import XForm from '../XForm';
import XFormEdit from '../XFormEdit';
import XFormView from '../XFormView';
import EForm from '../EForm';
import EModel from '../EModel';
import {NavLink} from 'react-router-dom';

const Routes = () => (
  <Router>
    <Header className="App-header"></Header>
    <Sidebar></Sidebar>
    <div id="content" className="app-content">
      <Route exact path="/" component={Home}/>
      <Route path="/upload" component={Upload}/>
      <Route path="/forms/:form/submissions" render={(props) => (
        <Submissions key={props.match.params.form} {...props} />)
      }/>
      <Route path="/forms/:form" render={(props) => (
        <XForm key={props.match.params.form} {...props} />)
      }/>
      <Route path="/eforms/:submissionId" render={(props) => (
        <EForm key={props.match.params.submissionId} {...props} />)
      }/>
      <Route path="/models/:submissionId" render={(props) => (
        <EModel key={props.match.params.submissionId} {...props} />)
      }/>
      <Route exact path="/submissions" component={Submissions}/>
      <Route path="/edit/:submissionId" render={(props) => (
        <XFormEdit key={props.match.params.submissionId} {...props} />)
      }/>
      <Route path="/submissions/:submissionId" render={(props) => (
        <XFormView key={props.match.params.submissionId} {...props} />)
      }/>
    </div>
  </Router>
)

export default Routes;
