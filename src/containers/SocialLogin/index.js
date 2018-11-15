import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import socialLoginAction from './state/actions';

const GoogleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const FacebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

export class SocialLogin extends Component {
  /* istanbul ignore next */
  responseGoogle = (response) => {
    const { socialLogin } = this.props;
    socialLogin([response, 'google'], this.successHandler);
  };

  /* istanbul ignore next */
  successHandler() {
    const { history } = this.props;
    history.push('/');
  }

  /* istanbul ignore next */
  responseFacebook = (response) => {
    const { socialLogin } = this.props;
    socialLogin([response, 'facebook'], this.successHandler);
  };

  /* istanbul ignore next */
  render() {
    return (
      <div className="valign-wrapper">
        <FacebookLogin
          appId={FacebookAppId}
          fields="name,email,picture"
          cssClass="btn-floating #0d47a1 blue darken-4 hoverable"
          icon="fa fa-facebook fa-2x"
          callback={this.responseFacebook}
        />
        <GoogleLogin
          clientId={GoogleClientId}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          type=""
          tag="div"
          className="col"
        >
          <button className="btn-floating #b71c1c red darken-4 hoverable" type="button">
            <i className="fa fa-google fa-2x" aria-hidden="true" />
          </button>
        </GoogleLogin>
      </div>
    );
  }
}

SocialLogin.propTypes = {
  socialLogin: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

const mapStateToProps = state => ({ socialLogin: state.SocialLogin });
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    socialLogin: socialLoginAction,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SocialLogin);
