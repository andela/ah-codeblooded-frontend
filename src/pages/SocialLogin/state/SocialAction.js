import api from "../../../utils/api";
import { START_LOGIN, FAIL_LOGIN, SUCCESS_LOGIN } from "./types";

export const start = () => ({
  type: START_LOGIN
});

export const fail = error => ({
  type: FAIL_LOGIN,
  payload: error
});

export const success = response => {
  return {
    type: SUCCESS_LOGIN,
    payload: response
  };
};
const socialLogin = data => dispatch => {
  dispatch(start());
  const provider = data[1] === "google" ? "google-oauth2" : "facebook";
  return api
    .post("users/social-auth/", {
      provider: provider,
      access_token: data[0].accessToken
    })
    .then(res => {
      localStorage.setItem("user", JSON.stringify(res));
      dispatch(success(res));
      this.props.history.push("/");
    })
    .catch(({ response }) => {
      // Error message
      let message = "";
      try {
        [message] = response.res.errors.error;
      } catch (err) {
        message = "try again.";
      }
      // dispatch action to login fail reducer
      dispatch(fail(message));
    });
};

export default socialLogin;
