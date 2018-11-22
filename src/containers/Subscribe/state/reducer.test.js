import subscribeReducer, { initialState } from './reducer';
import {
  SUBSCRIBE_NOTIFICATIONS_SUCCESS, UNSUBSCRIBE_NOTIFICATIONS_SUCCESS,
  SUBSCRIBE_UNSUBSCRIBE_FAILURE, FETCH_SUBSCRIPTION_STATUS,
  FETCH_SUBSCRIPTION_STATUS_FAILURE,
} from './types';


const statusAction = {
  type: FETCH_SUBSCRIPTION_STATUS,
  payload: {
    subscription_status: true,
  },
};

const subscribeAction = {
  type: SUBSCRIBE_NOTIFICATIONS_SUCCESS,
  payload: {
    message: 'You have successfully subscribed to our notifications.',
    subscription_status: true,
  },
};

const unsubscribeAction = {
  type: UNSUBSCRIBE_NOTIFICATIONS_SUCCESS,
  payload: {
    message: 'You have successfully unsubscribed from our notifications.',
    subscription_status: false,
  },
};

const subscribeFailureAction = {
  type: SUBSCRIBE_UNSUBSCRIBE_FAILURE,
  payload: 'errors',
};

const fetchstatusFailure = {
  type: FETCH_SUBSCRIPTION_STATUS_FAILURE,
  payload: 'errors',
};

let subscribeMessage;
let unsubscribeMessage;


describe('the subscribe and unsubscribe reducer', () => {
  beforeEach(() => {
    subscribeMessage = 'You have successfully subscribed to our notifications.';
    unsubscribeMessage = 'You have successfully unsubscribed from our notifications.';
  });

  it('should return the initial state', () => {
    expect(subscribeReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_SUBSCRIPTION_STATUS', () => {
    expect(subscribeReducer(undefined, statusAction)).toEqual({
      ...initialState,
      subscriptionStatus: true,

    });
  });

  it('should handle SUBSCRIBE_NOTIFICATIONS_SUCCESS', () => {
    expect(subscribeReducer(undefined, subscribeAction)).toEqual({
      ...initialState,
      message: subscribeMessage,
      subscriptionStatus: true,

    });
  });

  it('should handle UNSUBSCRIBE_NOTIFICATIONS_SUCCESS', () => {
    expect(subscribeReducer(undefined, unsubscribeAction)).toEqual({
      ...initialState,
      subscriptionStatus: false,
      message: unsubscribeMessage,

    });
  });

  it('should handle SUBSCRIBE_UNSUBSCRIBE_FAILURE', () => {
    expect(subscribeReducer(undefined, subscribeFailureAction)).toEqual({
      ...initialState,
      errors: "errors",

    });
  });

  it('should handle FETCH_SUBSCRIPTION_STATUS_FAILURE', () => {
    expect(subscribeReducer(undefined, fetchstatusFailure)).toEqual({
      ...initialState,
      errors: "errors",

    });
  });
});
