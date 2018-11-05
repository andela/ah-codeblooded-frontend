import api from '../../../utils/api';
import {
  VIEW_USER_PROFILE,
  USER_PROFILE_ERROR,
  EDIT_USER_PROFILE,
  EDIT_PROFILE_ERROR,
} from './types';
import { getCurrentUser } from '../../../utils/auth';

import { pageLoadingAction, pageLoadedAction } from '../../NavBar/state/actions';

export const getProfileSuccess = payload => ({
  type: VIEW_USER_PROFILE,
  payload,
});

export const getProfileFailure = errors => ({
  type: USER_PROFILE_ERROR,
  errors,
});

export const getUserProfileAction = username => dispatch => api
  .get(`profiles/${username}`)
  .then(res => dispatch(getProfileSuccess(res.data)))
  .catch(errors => dispatch(getProfileFailure(errors)));

export const editProfileSuccess = payload => ({
  type: EDIT_USER_PROFILE,
  payload,
});

export const editProfileFailure = errors => ({
  type: EDIT_PROFILE_ERROR,
  errors,
});

export const editUserProfileAction = (username, data) => (dispatch) => {
  dispatch(pageLoadingAction());
  return api.put(`profiles/${username}/`, data)
    .then((res) => {
      dispatch(editProfileSuccess(res.data));
      dispatch(pageLoadedAction());
      const user = { ...getCurrentUser(), ...res.data };
      localStorage.setItem("user", JSON.stringify(user));
    }).catch((errors) => {
      dispatch(editProfileFailure(errors.response));
      dispatch(pageLoadedAction());
    });
};
