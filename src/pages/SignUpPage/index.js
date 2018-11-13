import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../utils/routes';

class SignUpPage extends Component {
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
                <span className="card-title">Registration</span>
                <p>We are working to improve your experience.</p>
                <br />
                <Link to={ROUTES.index} className="btn">
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SignUpPage;