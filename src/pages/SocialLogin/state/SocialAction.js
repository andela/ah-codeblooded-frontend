import axios from "axios";
import { START_LOGIN, FAIL_LOGIN, SUCCESS_LOGIN } from "./types";
const api = "http://localhost:8000/api/users/social-auth/";
const start = () => ({
  type: START_LOGIN
});

const fail = error => ({
  type: FAIL_LOGIN,
  payload: error
});

const success = response => {
  this.props.history.push("/");
  return {
    type: SUCCESS_LOGIN,
    payload: response
  };
};
const socialLogin = data => {
  start();
  const provider = "google-oauth2";
  return axios
    .post(api, {
      provider: provider,
      access_token: data.accessToken
    })
    .then(data => {
      localStorage.setItem("user", JSON.stringify(data));
      success(data);
      this.props.history.push("/");
    })
    .catch(({ response }) => {
      // Error message
      let message = "";
      try {
        [message] = response.data.errors.error;
      } catch (err) {
        message = "try again.";
      }
      // dispatch action to login fail reducer
      fail(message);
    });
};

export default socialLogin;
