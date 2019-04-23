import React, {Component} from 'react';

class Navbar extends Component {
  render() {
    return (
      <ul className="navbar-nav navbar-right">
        <li className="nav-item">
          <a href="#" data-toggle="search-bar" className="nav-link">
            <i className="fa fa-search nav-icon"></i>
          </a>
        </li>
        <li className="nav-item dropdown">
          <a href="#" data-toggle="dropdown" data-display="static" className="nav-link">
            <i className="far fa-bell nav-icon"></i>
            <span className="nav-label">3</span>
          </a>
          <ul className="dropdown-menu dropdown-menu-right dropdown-menu-lg pt-0 pb-0">
            <li className="dropdown-header"><a href="#" className="dropdown-close">&times;</a>Today</li>
            <li className="dropdown-message">
              <a href="#">
                <div className="icon"><i className="fab fa-apple bg-primary"></i></div>
                <div className="info">
                  <h4 className="title">App Store <span className="time">Just now</span></h4>
                  <p className="desc">Your iOS application has been approved</p>
                </div>
              </a>
            </li>
            <li className="dropdown-message">
              <a href="#">
                <div className="icon"><i className="fab fa-android bg-success"></i></div>
                <div className="info">
                  <h4 className="title">Google Play <span className="time">5 min ago</span></h4>
                  <p className="desc">Your android application has been approved</p>
                </div>
              </a>
            </li>
            <li className="dropdown-message">
              <a href="#">
                <div className="icon"><i className="fab fa-github bg-muted"></i></div>
                <div className="info">
                  <h4 className="title">Github  <span className="time">12 min ago</span></h4>
                  <p className="desc">Error with notifications from Private Repos</p>
                </div>
              </a>
            </li>
            <li className="dropdown-header"><a href="#" className="dropdown-close">&times;</a>Yesterday</li>
            <li className="dropdown-message">
              <a href="#">
                <div className="icon"><i className="fa fa-envelope bg-purple"></i></div>
                <div className="info">
                  <h4 className="title">Gmail  <span className="time">12:50pm</span></h4>
                  <p className="desc">You have 2 unread email</p>
                </div>
              </a>
            </li>
            <li className="dropdown-message">
              <a href="#">
                <div className="icon"><div className="img"></div></div>
                <div className="info">
                  <h4 className="title">Corey  <span className="time">10:20am</span></h4>
                  <p className="desc">Theres so much room for activities!</p>
                </div>
              </a>
            </li>
            <li className="dropdown-message">
              <a href="#">
                <div className="icon"><i className="fab fa-twitter bg-gradient-aqua"></i></div>
                <div className="info">
                  <h4 className="title">Twitter  <span className="time">12:50pm</span></h4>
                  <p className="desc">@sergiolucas: Most rain in the last two days: 85mm Gabo Island (March)</p>
                </div>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a href="#" data-toggle="dropdown" data-display="static" className="nav-link">
            <i className="fa fa-cog nav-icon"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-right dropdown-menu-md pt-0 pb-0">
            <li className="dropdown-header">Notifications Settings</li>
            <li className="dropdown-setting">
              <div className="icon"><i className="fa fa-envelope text-muted"></i></div>
              <div className="info">Email</div>
              <div className="option">
                <div className="switcher switcher-success">
                  <input type="checkbox" name="setting_1" id="setting_1" checked />
                  <label for="setting_1"></label>
                </div>
              </div>
            </li>
            <li className="dropdown-setting">
              <div className="icon"><i className="fa fa-desktop text-muted"></i></div>
              <div className="info">Desktop & Mobile</div>
              <div className="option">
                <div className="switcher switcher-success">
                  <input type="checkbox" name="setting_2" id="setting_2" checked />
                  <label for="setting_2"></label>
                </div>
              </div>
            </li>
            <li className="dropdown-setting">
              <div className="icon"><i className="fa fa-comment-alt text-muted"></i></div>
              <div className="info">Text message</div>
              <div className="option">
                <div className="switcher switcher-success">
                  <input type="checkbox" name="setting_3" id="setting_3" />
                  <label for="setting_3"></label>
                </div>
              </div>
            </li>
            <li className="dropdown-header">Privacy Settings</li>
            <li className="dropdown-setting">
              <div className="icon"><i className="fa fa-list-ul text-muted"></i></div>
              <div className="info">Public friends list</div>
              <div className="option">
                <div className="switcher switcher-success">
                  <input type="checkbox" name="setting_4" id="setting_4" />
                  <label for="setting_4"></label>
                </div>
              </div>
            </li>
            <li className="dropdown-setting">
              <div className="icon"><i className="fa fa-user-secret text-muted"></i></div>
              <div className="info">Public profile page</div>
              <div className="option">
                <div className="switcher switcher-success">
                  <input type="checkbox" name="setting_5" id="setting_5" checked />
                  <label for="setting_5"></label>
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li className="nav-item dropdown">
          <a href="#" data-toggle="dropdown" data-display="static" className="nav-link">
            <span className="nav-img online">
              <img src="https://via.placeholder.com/60x60" alt="" />
            </span>
            <span className="d-none d-md-block">John Smith <b className="caret"></b></span>
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <a className="dropdown-item" href="#">Edit Profile</a>
            <a className="dropdown-item" href="#">Inbox</a>
            <a className="dropdown-item" href="#">Calendar</a>
            <a className="dropdown-item" href="#">Setting</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Log Out</a>
          </div>
        </li>
      </ul>
    )
  }
}

export default Navbar;
