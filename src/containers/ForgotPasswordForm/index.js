import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { forgotPasswordAction, resendLinkAction } from './state/actions';
import './ForgotPasswordForm.scss';

export class ForgotPasswordForm extends Component {
  state = {
    email: null,
    shouldShowError: true,
  };

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handleFocus = () => {
    this.setState({ shouldShowError: false });
  };

  handleSendLink = (event) => {
    event.preventDefault();
    this.setState({ shouldShowError: true });
    const { forgotPassword } = this.props;
    const { email } = this.state;
    forgotPassword(email);
  };

  handleResendLink = () => {
    const { resendLink } = this.props;
    resendLink();
  };

  renderErrorMessage = () => {
    const { error } = this.props;
    const { shouldShowError } = this.state;
    return error && shouldShowError ? <span className="red-text helper-text">{error}</span> : '';
  };

  renderSendLinkForm() {
    const { isRequesting } = this.props;
    return (
      <>
        <p>Enter your email below. You will receive a password reset link.</p>
        <form onSubmit={this.handleSendLink}>
          <div className="row">
            <div className="input-field">
              <input
                required
                type="email"
                name="email"
                className="validate"
                onChange={this.handleChange}
                onFocus={this.handleFocus}
              />
              <label className="active" htmlFor="email">Email</label>
              {this.renderErrorMessage()}
            </div>
            <div className="row center">
              <button
                type="submit"
                className="btn"
                disabled={isRequesting}
              >
                Send reset link
              </button>
            </div>
          </div>
        </form>
        </>
    );
  }

  renderResendLinkForm() {
    const { message } = this.props;
    return (
      <div className="row reset-link center">
        <p>{message}</p>
        <button
          type="button"
          className="btn"
          onClick={this.handleResendLink}
        >
          Resend Link
        </button>
      </div>
    );
  }

  render() {
    const { linkSent } = this.props;

    return linkSent ? this.renderResendLinkForm() : this.renderSendLinkForm();
  }
}

ForgotPasswordForm.propTypes = {
  forgotPassword: PropTypes.func.isRequired,
  resendLink: PropTypes.func.isRequired,
  message: PropTypes.string,
  error: PropTypes.string,
  linkSent: PropTypes.bool,
  isRequesting: PropTypes.bool,
};

ForgotPasswordForm.defaultProps = {
  error: null,
  message: null,
  linkSent: false,
  isRequesting: false,
};

const mapStateToProps = ({ forgotPassword }) => forgotPassword;

const mapDispatchToProps = dispatch => bindActionCreators({
  forgotPassword: forgotPasswordAction,
  resendLink: resendLinkAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
