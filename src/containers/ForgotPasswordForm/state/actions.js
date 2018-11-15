import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESEND_RESET_LINK,
} from './types';
import api from '../../../utils/api';

export const forgotPasswordAction = email => (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
  });
  return api.post('/account/forgot_password/', { email })
    .then((res) => {
      dispatch({
        type: FORGOT_PASSWORD_SUCCESS,
        payload: { message: res.data.message },
      });
    }).catch((err) => {
      const message = err.response ? err.response.data.message : 'Something went wrong. Try again.';
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: { error: message },
      });
    });
};

export const resendLinkAction = () => dispatch => (
  dispatch({
    type: RESEND_RESET_LINK,
  })
);
