import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  resetPasswordAction,
  resetFieldErrorAction,
  resetGenericErrorAction,
} from './state/actions';
import ROUTES from '../../utils/routes';
import { getQueryParam, randomKey } from '../../utils/helpers';
import './ForgotPasswordForm.scss';

export class ResetPasswordForm extends Component {
  state = {
    email: null,
    password: null,
    confirmPassword: null,
  };

  handleFocus = (name) => {
    const { resetFieldError, resetGenericError } = this.props;
    resetGenericError();
    resetFieldError(name);
  };

  handleUpdate = (event) => {
    const { resetGenericError } = this.props;
    resetGenericError();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleResetPassword = (event) => {
    event.preventDefault();
    const { resetPassword } = this.props;
    const { email, password, confirmPassword } = this.state;
    resetPassword(email, password, confirmPassword, getQueryParam('token'));
  };

  static renderError(message) {
    return message ? <span key={randomKey()} className="red-text helper-text">{message}</span> : '';
  }

  renderGenericError() {
    const { errors } = this.props;
    return ResetPasswordForm.renderError(errors.error);
  }

  renderFieldErrors(field) {
    const { errors } = this.props;
    const fieldErrors = errors[field];
    return fieldErrors ? fieldErrors.map(error => ResetPasswordForm.renderError(error)) : '';
  }

  renderInput(type, name, label, jsonName = null) {
    const jsonId = jsonName || name;
    return (
      <div className="input-field">
        <input
          required
          type={type}
          name={name}
          className="validate"
          onFocus={() => this.handleFocus(jsonId)}
          onChange={this.handleUpdate}
        />
        <label className="active" htmlFor={name}>{label}</label>
        {this.renderFieldErrors(jsonId)}
      </div>
    );
  }

  renderResetPasswordForm() {
    const { isRequesting } = this.props;
    return (
      <form onSubmit={this.handleResetPassword}>
        <div className="row">
          {this.renderGenericError()}
          {this.renderInput('email', 'email', 'Email')}
          {this.renderInput('password', 'password', 'Password')}
          {this.renderInput('password', 'confirmPassword', 'Confirm password', 'confirm_password')}
          <div className="row center">
            <button
              type="submit"
              className="btn"
              disabled={isRequesting}
            >
            Reset password
            </button>
          </div>
        </div>
      </form>
    );
  }

  renderPasswordResetSuccess() {
    const { message } = this.props;
    return (
      <>
        <div className="row center">
          <p>{message}</p>
          <div className="login-btn">
            <Link to={ROUTES.auth.login} className="btn">Login</Link>
          </div>
        </div>
        </>
    );
  }

  render() {
    const { resetSuccessful } = this.props;
    return resetSuccessful ? this.renderPasswordResetSuccess() : this.renderResetPasswordForm();
  }
}

ResetPasswordForm.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  resetFieldError: PropTypes.func.isRequired,
  resetGenericError: PropTypes.func.isRequired,
  message: PropTypes.string,
  isRequesting: PropTypes.bool,
  resetSuccessful: PropTypes.bool,
  errors: PropTypes.shape(),
};

ResetPasswordForm.defaultProps = {
  message: null,
  isRequesting: false,
  resetSuccessful: false,
  errors: {},
};

const mapStateToProps = ({ resetPassword }) => resetPassword;

const mapDispatchToActions = dispatch => bindActionCreators({
  resetPassword: resetPasswordAction,
  resetFieldError: resetFieldErrorAction,
  resetGenericError: resetGenericErrorAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToActions)(ResetPasswordForm);
