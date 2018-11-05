import React, { Component } from "react";
import { Link } from "react-router-dom";
import ROUTES from "../../utils/routes";
import SocialLogin from "../SocialLogin";

class LoginPage extends Component {
  render() {
    return (
      <>
        <nav className="white black-text">
          <div className="container">
            <div className="nav-wrapper">
              <a
                href={ROUTES.index}
                className="brand-logo center black-text logo"
              >
                {"Author's Haven"}
              </a>
            </div>
          </div>
        </nav>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <div className="card white darken-1">
              <div className="card-content black-text">
                <span className="card-title">Login</span>
                <p>We are working to improve your experience.</p>
                <br />
                <SocialLogin {...this.props} />
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

export default LoginPage;
