import React from 'react';
import Routes from './Routes';
import { withAuthenticator } from 'aws-amplify-react';
// import {connect} from 'react-redux';
import './App.css';

const App = () => (
  <div id="app" className="app app-header-fixed app-sidebar-fixed">
    <div className="App">
      <Routes/>
    </div>
  </div>
);

// const mapStateToProps = (state) => state;
// export default connect(mapStateToProps)(App);
// export default App;
export default withAuthenticator(App, {includeGreetings: true});
