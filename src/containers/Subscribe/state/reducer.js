import {
  SUBSCRIBE_NOTIFICATIONS_SUCCESS, SUBSCRIBE_UNSUBSCRIBE_FAILURE,
  UNSUBSCRIBE_NOTIFICATIONS_SUCCESS, FETCH_SUBSCRIPTION_STATUS,
  FETCH_SUBSCRIPTION_STATUS_FAILURE,
} from './types';

export const initialState = {
  subscriptionStatus: null,
  message: '',
  errors: [],
};

const subscribeReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_SUBSCRIPTION_STATUS:
    return { ...state, subscriptionStatus: action.payload.subscription_status };
  case FETCH_SUBSCRIPTION_STATUS_FAILURE:
    return { ...state, errors: action.payload };
  case SUBSCRIBE_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      message: action.payload.message,
      subscriptionStatus: action.payload.subscription_status,
    };
  case UNSUBSCRIBE_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      subscriptionStatus: action.payload.subscription_status,
      message: action.payload.message,
    };
  case SUBSCRIBE_UNSUBSCRIBE_FAILURE:
    return { ...state, errors: action.payload };
  default:
    return state;
  }
};

export default subscribeReducer;
