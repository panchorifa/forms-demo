import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './NavbarHeader.css';

class NavbarHeader extends Component {

  render() {
    return (
      <div className="navbar-header">
        <button type="button" className="navbar-toggle" data-click="sidebar-toggled">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>

        <NavLink to="/" className="navbar-brand">WEBXFORMS</NavLink>
      </div>
    )
  }
}

export default NavbarHeader;
