import React, {Component} from 'react';

class NavbarSearch extends Component {

  render() {
    return (
      <div className="navbar-search">
        <form action="#" method="POST" name="navbar_search_form">
          <div className="form-group">
            <div className="icon"><i className="fa fa-search"></i></div>
            <input type="text" className="form-control" id="header-search" placeholder="Search admetro..." />
            <div className="icon">
              <a href="#" data-dismiss="search-bar" className="right-icon"><i className="fa fa-times"></i></a>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default NavbarSearch;
