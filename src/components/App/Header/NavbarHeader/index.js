import React, {Component} from 'react';

class NavbarHeader extends Component {

  render() {
    return (
      <div className="navbar-header">
        <a href="index.html" className="navbar-brand">
          Surveys
        </a>
        <button type="button" className="navbar-toggle" data-click="sidebar-toggled">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
      </div>
    )
  }
}

export default NavbarHeader;
