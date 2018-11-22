import MockAdapter from 'axios-mock-adapter';
import mockStore from '../../../utils/redux_mock_store';
import api, { getURL } from '../../../utils/api';
import {
  SUBSCRIBE_NOTIFICATIONS_SUCCESS, SUBSCRIBE_UNSUBSCRIBE_FAILURE,
  UNSUBSCRIBE_NOTIFICATIONS_SUCCESS,
} from './types';

import { subscription, fetchSubscriptionStatus, fetchStatus } from './actions';


describe('the subscription actions', () => {
  const mock = new MockAdapter(api);
  let store;
  const url = `notifications/subscribe/`;
  let isSubscribed = false;
  let subscribeMessage;
  let unsubscribeMessage;
  let subscriptionStatus;

  const subscribeAction = payload => ({ type: SUBSCRIBE_NOTIFICATIONS_SUCCESS, payload });
  const unsubscribeAction = payload => ({ type: UNSUBSCRIBE_NOTIFICATIONS_SUCCESS, payload });
  const subscriptionFailureAction = error => ({ type: SUBSCRIBE_UNSUBSCRIBE_FAILURE, error });
  const statusFailureAction = error => ({ type: SUBSCRIBE_UNSUBSCRIBE_FAILURE, error });


  beforeEach(() => {
    store = mockStore();
    subscribeMessage = 'You have successfully subscribed to our notifications.';
    unsubscribeMessage = 'You have successfully unsubscribed from our notifications.';
    subscriptionStatus = true;
  });

  afterEach(() => {
    mock.reset();
    store.clearActions();
  });

  it('should dispatch FETCH_SUBSCRIPTION_STATUS', () => {
    mock.onGet(getURL('notifications/subscription-status/')).reply(200, subscriptionStatus);
    return store.dispatch(fetchStatus()).then((data) => {
      expect(store.getActions()).toContainEqual(fetchSubscriptionStatus(data));
    });
  });

  it('should dispatch FETCH_SUBSCRIPTION_STATUS_FAILURE', () => {
    mock.onGet(getURL('notifications/subscription-status/')).reply(200, subscriptionStatus);
    return store.dispatch(fetchStatus()).then(() => {
    }).catch((error) => {
      expect(store.getActions()).toContainEqual(statusFailureAction(error));
    });
  });

  it('should dispatch SUBSCRIBE_NOTIFICATIONS_SUCCESS', () => {
    mock.onPost(getURL(url)).reply(200, subscribeMessage);
    return store.dispatch(subscription(isSubscribed)).then((data) => {
      expect(store.getActions()).toContainEqual(subscribeAction(data));
    });
  });

  it('should dispatch UNSUBSCRIBE_NOTIFICATIONS_SUCCESS', () => {
    isSubscribed = true;
    mock.onDelete(getURL(url)).reply(200, unsubscribeMessage);
    return store.dispatch(subscription(isSubscribed)).then((data) => {
      expect(store.getActions()).toContainEqual(unsubscribeAction(data));
    });
  });

  it('should dispatch SUBSCRIBE_UNSUBSCRIBE_FAILURE', () => {
    isSubscribed = true;
    mock.onPost(getURL()).reply(200, unsubscribeMessage);
    return store.dispatch(subscription(isSubscribed)).then(() => {
    }).catch(((error) => {
      expect(store.getActions()).toContainEqual(subscriptionFailureAction(error));
    }));
  });
});
