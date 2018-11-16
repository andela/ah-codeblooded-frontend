import {
  SUBSCRIBE_NOTIFICATIONS_SUCCESS, SUBSCRIBE_UNSUBSCRIBE_FAILURE,
  UNSUBSCRIBE_NOTIFICATIONS_SUCCESS,
} from './types';

import api from '../../../utils/api';

export const subscription = isSubscribed => (dispatch) => {
  const url = `notifications/subscribe/`;
  const axios = api.post(url);
  return axios.then((res) => {
    dispatch({
      type: isSubscribed ? SUBSCRIBE_NOTIFICATIONS_SUCCESS : UNSUBSCRIBE_NOTIFICATIONS_SUCCESS,
      payload: res.data.message,
    });
  }).catch((error) => {
    dispatch({
      type: SUBSCRIBE_UNSUBSCRIBE_FAILURE,
      payload: error,
    });
  });
};
