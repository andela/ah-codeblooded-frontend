import api from "../../../utils/api";
import { START_LOGIN, FAIL_LOGIN, SUCCESS_LOGIN } from "./types";

export const start = () => ({
  type: START_LOGIN,
});

export const fail = error => ({
  type: FAIL_LOGIN,
  payload: error,
});

export const success = response => ({
  type: SUCCESS_LOGIN,
  payload: response,
});

/* istanbul ignore next */
const socialLogin = (data, successHandler) => (dispatch) => {
  dispatch(start());
  const provider = data[1] === "google" ? "google-oauth2" : "facebook";
  return api
    .post("users/social-auth/", {
      provider,
      access_token: data[0].accessToken,
    })
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      dispatch(success(res.data));
      window.location.reload();
      if (successHandler) {
        successHandler(res.data);
      }
    })
    .catch(({ response }) => {
      let message = "";
      try {
        [message] = response.res.errors.error;
      } catch (err) {
        message = "try again.";
      }
      dispatch(fail(message));
    });
};

export default socialLogin;
