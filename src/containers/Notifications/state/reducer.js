import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILURE,
  FETCH_NOTIFICATIONS_ERROR,

} from './types';

const initialState = {
  count: 0,
  notificationList: [],
  isFetching: false,
  erroring: false,
  errors: [],
};

const notificationsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_NOTIFICATIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        count: payload.count,
        notificationList: payload,
        isFetching: false,
      };
    case FETCH_NOTIFICATIONS_FAILURE:
      return {
        ...state,
        errors: payload,
        erroring: true,
      };
    case FETCH_NOTIFICATIONS_ERROR:
      return {
        ...state,
        errors: payload,
        erroring: true,
      };
    default:
      return state;
  }
};

export default notificationsReducer;
