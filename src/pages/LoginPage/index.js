import React, { Component } from "react";
import PropTypes from "prop-types";
import SocialLogin from "../SocialLogin";
import ROUTES from "../../utils/routes";
import Loginform from "../../containers/LoginForm";

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
        <div>
          <Loginform history={this.props.history} />
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <SocialLogin {...this.props} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default LoginPage;
