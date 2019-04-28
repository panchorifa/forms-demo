import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <header id="header" className="app-header">
        <div className="xforms-header">
          <button type="button" className="navbar-toggle navbar-toggle-minify" data-click="sidebar-minify">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>
        <div className="xforms-brand">
          <NavLink to="/" className="xbrand">WEBXFORMS</NavLink>
        </div>
      </header>
    )
  }
}

export default Header;
