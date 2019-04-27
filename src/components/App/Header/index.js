import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div className="webxforms-header">
        <header id="header" className="app-header">
          <button type="button" className="navbar-toggle navbar-toggle-minify" data-click="sidebar-minify">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </header>
        <NavLink to="/" className="navbar-brand">WEBXFORMS</NavLink>
      </div>
    )
  }
}

export default Header;
