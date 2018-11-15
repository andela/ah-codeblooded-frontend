import React, { Component } from "react";
import PropTypes from "prop-types";
import ConnectedLoginForm from '../../containers/LoginForm';
import SignUpForm from '../../containers/SignupForm';
import ROUTES from "../../utils/routes";
import { SocialLogin } from '../../containers/SocialLogin/index';
import './AuthPage.scss';

class AuthPage extends Component {
  state ={
    login: true,
  }

  renderForms = () => (
    this.state.login ? (
      <div>
        <ConnectedLoginForm history={this.props.history} />
      </div>
    ) : (
      <div>
        <SignUpForm />
      </div>
    )
  );

  componentWillMount() {
    this.setState({ login: this.props.match.path === ROUTES.auth.login });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ login: nextProps.match.path === ROUTES.auth.login });
  }

  render() {
    return (
      <>
        <div className="landing background" />
        <div className="landing-image" />
        <h3 className="landing-title">{'Author\'s Haven'}</h3>
        <div className="landing-content">
          <div className="row">
            <div className="col s12 m6 l4 offset-l4 offset-m3">
              <div>
                { this.renderForms() }
              </div>
              <div className="row center">
                <p>Or Login in with...</p>
                <div className="row center">
                  <SocialLogin />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

AuthPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.shape({}),
  }).isRequired,
};

export default AuthPage;
