import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

class Header extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <li className="nav-item">
          <Link to="/signout" className="nav-link">
            Sign Out
          </Link>
        </li>
      );
    } else {
      return [
        <li className="nav-item" key={0}>
          <Link to="signin" className="nav-link">
            Sign in
          </Link>
        </li>,
        <li className="nav-item" key={1}>
          <Link to="signup" className="nav-link">
            Sign Up
          </Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">
          <img src="https://wcdn.wavecell.com/wp-content/themes/wavecell/img/logo-v2.svg" />
        </Link>
        <ul className="nav navbar-nav">{this.renderLinks()}</ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Header);
