import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import activateUserAction, {
  activateUser,
  activationSuccess,
  activationError,
} from './actions';
import {
  ACTIVATE_USER,
  ACTIVATE_SUCCESS,
  ACTIVATE_ERROR,
} from './types';
import { token, uid } from './mock';
import api, { getURL } from '../../../utils/api';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(api);
const url = getURL(`account/verify/${token}/${uid}/`);
let store;

beforeEach(() => {
  store = mockStore({});
});

afterEach(() => {
  store.clearActions();
});

describe('Account verification actions', () => {
  it('should dispatch ACTIVATE_USER when activating account ', () => {
    mock.onGet(url).reply(200);
    return store.dispatch(activateUserAction(token, uid)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: ACTIVATE_USER,
      });
    });
  });

  it('should dispatch ACTIVATE_SUCCESS on successful activation', () => {
    mock.onGet(url).reply(200);
    return store.dispatch(activateUserAction(token, uid)).then(() => {
      expect(store.getActions()[1]).toEqual({
        type: ACTIVATE_SUCCESS,
        payload: { msg: "Account activation was successful" },
      });
    });
  });

  it('should dispatch ACTIVATE_ERROR when an error occurs during registration', () => {
    mock.onGet(url).reply(400);
    return store.dispatch(activateUserAction(token, uid)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: ACTIVATE_ERROR,
        payload: { msg: 'Your activation link is Invalid or has expired' },
      });
    });
  });

  it('should dispatch ACTIVATE_ERROR when wrong url is passed', () => {
    mock.onGet(url).reply(404);
    return store.dispatch(activateUserAction(token)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: ACTIVATE_ERROR,
        payload: { msg: "Something went wrong. Try again" },
      });
    });
  });

  it('should return an object with type ACTIVATE_USER when activateUser method is called', () => {
    expect(activateUser('token', "uid")).toEqual({ type: 'ACTIVATE_USER' });
  });

  it('should return an object when activationSuccess method is called', () => {
    expect(activationSuccess()).toEqual({
      type: ACTIVATE_SUCCESS,
      payload: { msg: 'Account activation was successful' },
    });
  });

  it('should return an object when activationError method is called', () => {
    expect(activationError('Account activation failed')).toEqual({
      type: ACTIVATE_ERROR,
      payload: { msg: 'Account activation failed' },
    });
  });
});
