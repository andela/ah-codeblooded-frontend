import {
  ACTIVATE_ERROR,
  ACTIVATE_SUCCESS,
  ACTIVATE_USER,
} from './types';
import api from '../../../utils/api';

export const activateUser = () => ({
  type: ACTIVATE_USER,
});

export const activationSuccess = () => ({
  type: ACTIVATE_SUCCESS,
  payload: { msg: 'Account activation was successful' },
});

export const activationError = msg => ({
  type: ACTIVATE_ERROR,
  payload: { msg },
});


const activateUserAction = (token, uid) => (dispatch) => {
  dispatch(activateUser());
  return api.get(`account/verify/${token}/${uid}/`).then(() => {
    dispatch(activationSuccess());
  }).catch((error) => {
    const msg = error.response && "Something went wrong. Try again";
    dispatch(activationError(msg));
  });
};

export default activateUserAction;
