import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import register, { registerUserSuccess, registrationStarted, registerUserFailure } from './actions';
import {
  REGISTER_USER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from './types';
import {
  data,
  user,
  signupData,
  errors,
} from './mock';
import api, { getURL } from '../../../utils/api';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('__test__ actions', () => {
  const mock = new MockAdapter(api);
  const url = getURL('users/');

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch REGISTER_USER when registering user ', () => {
    mock.onPost(url, signupData).reply(201, data);
    return store.dispatch(register(signupData)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: REGISTER_USER,
      });
    });
  });

  it('should dispatch REGISTER_SUCCESS when done registering users', () => {
    mock.onPost(url, user).reply(200, data);
    return store.dispatch(register(user)).then(() => {
      expect(store.getActions()[1]).toEqual({
        payload: data.user,
        type: REGISTER_SUCCESS,
      });
    });
  });

  it('should dispatch REGISTER_ERROR it  fails while registering users', () => {
    mock.onPost(url, user).reply(404, errors);
    return store.dispatch(register(user)).then(() => {
      expect(store.getActions()[1]).toEqual({
        payload: ['password must contain special characters'],
        type: REGISTER_ERROR,
      });
    });
  });

  it('should return an object with type REGISTER_USER when called', () => {
    expect(registrationStarted()).toEqual({ type: 'REGISTER_USER' });
  });

  it('should return an object with type REGISTER_SUCCESS and payload when called', () => {
    expect(registerUserSuccess(signupData)).toEqual({
      payload: { email: 'gitaumoses4@gmail.com', password: 'Password11!', username: 'username' },
      type: 'REGISTER_SUCCESS',
    });
  });

  it('should return an object with type REGISTER_ERROR and payload when called', () => {
    expect(registerUserFailure(errors)).toEqual({
      payload: {
        errors: ['password must contain special characters'],
      },
      type: 'REGISTER_ERROR',
    });
  });
});
