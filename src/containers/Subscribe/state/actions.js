import {
  SUBSCRIBE_NOTIFICATIONS_SUCCESS, SUBSCRIBE_UNSUBSCRIBE_FAILURE,
  UNSUBSCRIBE_NOTIFICATIONS_SUCCESS, FETCH_SUBSCRIPTION_STATUS,
  FETCH_SUBSCRIPTION_STATUS_FAILURE,
} from './types';

import api from '../../../utils/api';

export const fetchSubscriptionStatus = payload => ({ type: FETCH_SUBSCRIPTION_STATUS, payload });

export const fetchStatus = () => (dispatch) => {
  const url = 'notifications/subscription-status/';
  return api.get(url).then((res) => {
    dispatch(fetchSubscriptionStatus(res.data.data));
  }).catch((error) => {
    dispatch({
      type: FETCH_SUBSCRIPTION_STATUS_FAILURE,
      payload: error.message,
    });
  });
};

export const subscription = isSubscribed => (dispatch) => {
  const url = 'notifications/subscribe/';
  const axios = isSubscribed ? api.delete(url) : api.post(url);
  return axios.then((res) => {
    dispatch({
      type: isSubscribed ? UNSUBSCRIBE_NOTIFICATIONS_SUCCESS : SUBSCRIBE_NOTIFICATIONS_SUCCESS,
      payload: res.data.data,
    });
  }).catch((error) => {
    dispatch({
      type: SUBSCRIBE_UNSUBSCRIBE_FAILURE,
      payload: error.message,
    });
  });
};
