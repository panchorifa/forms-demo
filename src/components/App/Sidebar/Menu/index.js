import React, {Component} from 'react';

class Menu extends Component {
  render() {
    return (
      <li className="has-sub">
        <a href="#">
          <span className="nav-icon"><i className="fa fa-envelope"></i> </span>
          <span className="nav-text">Email <span className="nav-label">20+</span></span>
          <span className="nav-caret"><b className="caret"></b></span>
        </a>
        <ul className="nav-submenu">
          <li><a href="email_inbox.html">Inbox</a></li>
          <li><a href="email_compose.html">Compose</a></li>
          <li><a href="email_detail.html">Detail</a></li>
        </ul>
      </li>
    )
  }
}
