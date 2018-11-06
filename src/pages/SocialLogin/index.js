import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import socialLogin from "./state/SocialAction";

const GoogleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const FacebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;

class SocialLogin extends Component {
  render() {
    const responseGoogle = response => {
      socialLogin(response, "google");
    };

    const responseFacebook = response => {
      console.log(response);
    };
    return (
      <div className="valign-wrapper">
        <FacebookLogin
          appId={FacebookAppId}
          fields="name,email,picture"
          cssClass="btn-floating #0d47a1 blue darken-4 hoverable"
          icon="fa fa-facebook fa-2x"
          callback={responseFacebook}
          textButton=""
        />
        <GoogleLogin
          clientId={GoogleClientId}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          type=""
          tag="div"
          className="col"
        >
          <button
            className="btn-floating #b71c1c red darken-4 hoverable"
            type="button"
          >
            <i className="fa fa-google fa-2x" aria-hidden="true" />
          </button>
        </GoogleLogin>
      </div>
    );
  }
}

export default SocialLogin;
