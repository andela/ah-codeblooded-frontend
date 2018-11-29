import {
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  REGISTER_USER,
} from './types';
import api from '../../../utils/api';

export const registrationStarted = () => ({
  type: REGISTER_USER,
});

export const registerUserSuccess = payload => ({
  type: REGISTER_SUCCESS,
  payload,
});

export const registerUserFailure = payload => ({
  type: REGISTER_ERROR,
  payload,
});

const registerUserAction = userData => (dispatch) => {
  dispatch(registrationStarted());
  return api.post('users/', userData).then((data) => {
    dispatch(registerUserSuccess(data.data.user));
  }).catch((error) => {
    dispatch(registerUserFailure(error.response ? error.response.data.errors : {}));
  });
};

export default registerUserAction;
