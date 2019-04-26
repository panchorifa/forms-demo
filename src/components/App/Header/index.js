import React, {Component} from 'react';
import Navbar from './Navbar/index';
import NavbarHeader from './NavbarHeader/index';
import NavbarSearch from './NavbarSearch/index';
import {NavLink} from 'react-router-dom';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <header id="header" className="app-header">
        <button type="button" className="navbar-toggle navbar-toggle-minify" data-click="sidebar-minify">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <NavLink to="/" className="navbar-brand">WEBXFORMS</NavLink>
      </header>
    )
  }
}

export default Header;

// <Navbar></Navbar>
// <NavbarSearch></NavbarSearch>
// <button type="button" className="navbar-toggle navbar-toggle-minify" data-click="sidebar-minify">
//   <span className="icon-bar"></span>
//   <span className="icon-bar"></span>
// </button>
        // <NavLink to="/" className="navbar-brand">WEBXFORMS</NavLink>

        // <NavbarHeader></NavbarHeader>
