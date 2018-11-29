import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATIONS_ERROR,
} from "./types";

import api from '../../../utils/api';

export const fetchNotifications = () => ({
  type: FETCH_NOTIFICATIONS_START,
});

export const fetchNotificationsSuccess = payload => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  payload,
});

export const fetchNotificationsFailure = errors => ({
  type: FETCH_NOTIFICATIONS_FAILURE,
  payload: errors,
});

export const fetchNotificationsError = errors => ({
  type: FETCH_NOTIFICATIONS_ERROR,
  payload: errors,
});

export const fetchNotificationsAction = () => (dispatch) => {
  dispatch(fetchNotifications());
  return api.get('notifications/all/')
    .then((res) => {
      dispatch(fetchNotificationsSuccess(res.data.data));
    })
    .catch((errors) => {
      if (errors.response) {
        dispatch(fetchNotificationsFailure(errors.response.data));
      } else {
        dispatch(fetchNotificationsError(errors.message));
      }
    });
};
