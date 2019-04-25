import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {API} from 'aws-amplify';
import './Sidebar.css';
import axios from 'axios';

const colors = ['orange', 'green', 'purple', 'blue', 'yellow',
  'red', 'indigo', 'gray', 'orange', 'green', 'purple', 'blue', 'yellow',
  'red', 'indigo', 'gray', 'orange', 'green', 'purple', 'blue', 'yellow',
  'red', 'indigo', 'gray', 'orange', 'green', 'purple', 'blue', 'yellow',
  'red', 'indigo', 'gray', 'orange', 'green', 'purple', 'blue', 'yellow',
  'red', 'indigo', 'gray', 'orange', 'green', 'purple', 'blue', 'yellow',
  'red', 'indigo', 'gray', 'orange', 'green', 'purple', 'blue', 'yellow',
  'red', 'indigo', 'gray'];

const XAPI = 'https://yqtqjifgk0.execute-api.us-east-1.amazonaws.com/dev';
const NAME_LIMIT = 21;

const getForms = async () => {
  try {
    const res = await axios({method: 'GET', url:`${XAPI}/xforms`});
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

class Sidebar extends Component {
  state = {forms: [], colors, error: null};

  formatName(name) {
    if(name.length > NAME_LIMIT) {
      name = name.substring(0, NAME_LIMIT);
      return `${name}...`;
    }
    return name;
  }

  async componentDidMount() {
    this.setState({forms: await getForms()});
  }

  render() {
    const {forms, colors} = this.state;
    return (
  		<div id="sidebar" className="app-sidebar">
  			<div data-scrollbar="true" data-height="100%">
  				<ul className="nav">
  					<li className="nav-header text-left">Navigation</li>
  					<li>
  						<NavLink exact to="/" activeClassName="active">
  							<span className="nav-icon"><i className="fa fa-home"></i></span>
  							<span className="nav-text">Home</span>
  						</NavLink>
  					</li>
  					<li>
  						<NavLink to="/upload" activeClassName="active">
  							<span className="nav-icon"><i className="fa fa-arrow-up"></i></span>
  							<span className="nav-text">Form Upload</span>
  						</NavLink>
  					</li>
  					<li>
  						<NavLink to="/submissions" activeClassName="active">
  							<span className="nav-icon"><i className="fa fa-table"></i></span>
  							<span className="nav-text">Submissions</span>
  						</NavLink>
  					</li>
            <li className="nav-divider"></li>
  					<li className="nav-header text-left">XForms</li>

            {forms.map((form, i) =>
              <li key={`li-${form.id}`}>
                <NavLink to={`/forms/${form.id.toLowerCase()}`}>
                  <span className="nav-icon"><i className={"fa fa-file-alt text-white bg-gradient-"+colors[i]}></i></span>
                  <span className="nav-text">{this.formatName(form.id)}</span>
                </NavLink>
              </li>
            )}
  					<li className="nav-divider"></li>
  					<li className="nav-copyright">&copy; 2019 All Rights Reserved</li>
  				</ul>
  			</div>
  		</div>
    )
  }
}

export default Sidebar;
