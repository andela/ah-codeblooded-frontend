import {
  SUBSCRIBE_NOTIFICATIONS_SUCCESS, SUBSCRIBE_UNSUBSCRIBE_FAILURE,
  UNSUBSCRIBE_NOTIFICATIONS_SUCCESS,
} from './types';

export const initialState = {
  isSubscribed: true,
  message: '',
  errors: [],
};

const subscribeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBE_NOTIFICATIONS_SUCCESS:
      return { ...state, isSubscribed: true, message: action.payload };
    case UNSUBSCRIBE_NOTIFICATIONS_SUCCESS:
      return { ...state, isSubscribed: false, message: action.payload };
    case SUBSCRIBE_UNSUBSCRIBE_FAILURE:
      return { ...state, errors: action.payload };
    default:
      return state;
  }
};

export default subscribeReducer;
