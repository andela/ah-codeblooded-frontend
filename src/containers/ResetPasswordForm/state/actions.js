import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  PASSWORD_RESET_FAIL,
  RESET_FIELD_ERROR,
  RESET_GENERIC_ERROR,
} from './types';
import api from '../../../utils/api';

export const resetGenericErrorAction = () => (dispatch) => {
  dispatch({
    type: RESET_GENERIC_ERROR,
  });
};

export const resetFieldErrorAction = field => (dispatch) => {
  dispatch({
    type: RESET_FIELD_ERROR,
    payload: { field },
  });
};

export const resetPasswordAction = (email, password, confirmPassword, token) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_REQUEST,
  });
  return api.put(`/account/reset_password/${token}/`, {
    email, password, confirm_password: confirmPassword,
  })
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: { message: res.data.message },
      });
    }).catch((err) => {
      const payload = {
        errors: err.response ? err.response.data.errors : { error: 'Something went wrong. Try again.' },
      };
      dispatch({
        type: PASSWORD_RESET_FAIL,
        payload,
      });
    });
};
