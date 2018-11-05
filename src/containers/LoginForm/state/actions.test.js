import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_START } from './types';
import login, { loginFailure, logingIn, loginSuccess } from './actions';
import { user, err, resData } from './mock';
import api, { getURL } from '../../../utils/api';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

const callBack = jest.fn();

describe('login actions', () => {
  const mock = new MockAdapter(api);
  const url = getURL('users/login/');

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch loginIn ', () => {
    mock.onPost(url, user).reply(200, resData);
    return store.dispatch(login(user, callBack)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: LOGIN_START,
      });
    });
  });

  it('should dispatch loginFailure ', () => {
    mock.onPost(url, user).reply(400, err);
    return store.dispatch(login(user, callBack)).catch(() => {
      expect(store.getActions()[0]).toEqual({
        type: LOGIN_FAILURE,
      });
    });
  });

  describe('login request action creator', () => {
    it('should create an action to login user', () => {
      const expectedAction = {
        type: LOGIN_START,
      };
      expect(logingIn()).toEqual(expectedAction);
    });
  });

  it('should dispatch loginSuccess ', () => {
    mock.onPost(url, user).reply(200, resData);
    return store.dispatch(login(user, callBack)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: LOGIN_START,
      });
    });
  });

  describe('loginin failure action creator', () => {
    it('should create an action to dispatch errors to the user', () => {
      const error = err;
      const expectedAction = {
        type: LOGIN_FAILURE,
        payload: err,
      };
      expect(loginFailure(error)).toEqual(expectedAction);
    });
  });

  describe('loginin success action creator', () => {
    it('should create an action to dispatch success response.', () => {
      const data = resData;
      const expectedAction = {
        type: LOGIN_SUCCESS,
        data,
      };
      expect(loginSuccess(data)).toEqual(expectedAction);
    });
  });

  describe('loginin success action creator', () => {
    it('should create an action to dispatch success response.', () => {
      const data = resData;
      const expectedAction = {
        type: LOGIN_SUCCESS,
        data,
      };
      expect(loginSuccess(data)).toEqual(expectedAction);
    });
  });
});
