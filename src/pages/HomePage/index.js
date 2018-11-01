import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../utils/routes';

class HomePage extends Component {
  render() {
    return (
      <>
        <nav className="white black-text">
          <div className="container">
            <div className="nav-wrapper">
              <a href={ROUTES.index} className="brand-logo center black-text logo">{'Author\'s Haven'}</a>
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card white darken-1">
              <div className="card-content black-text">
                <span className="card-title">{'Welcome to Author\'s Haven'}</span>
                <p>We are working to improve your experience.</p>
              </div>
              <div className="card-action">
                <Link to={ROUTES.login}>
                  Login
                </Link>
                <Link to={ROUTES.register}>
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default HomePage;
