import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import api from '../../../utils/api';
import config from '../../../utils/config';
import {
  resetFieldErrorAction,
  resetGenericErrorAction,
  resetPasswordAction,
} from './actions';
import {
  PASSWORD_RESET_FAIL,
  RESET_FIELD_ERROR,
  RESET_GENERIC_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from './types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

let store;

describe('The ResetPassword actions', () => {
  const mock = new MockAdapter(api);
  const token = '518-4ac5d9706e93abbbc2be';
  const url = `${config.BASE_URL}account/reset_password/${token}/`;
  const email = 'email@mail.com';
  const password = 'P@ssWord!!';
  const confirmPassword = 'P@ssWord!!';
  const successData = { message: 'Foo Bar.' };

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
    mock.reset();
  });

  it('should dispatch RESET_GENERIC_ERROR on resetGenericErrorAction', () => {
    store.dispatch(resetGenericErrorAction());
    expect(store.getActions()).toContainEqual({ type: RESET_GENERIC_ERROR });
  });

  it('should dispatch RESET_FIELD_ERROR on resetFieldErrorAction', () => {
    store.dispatch(resetFieldErrorAction('email'));
    expect(store.getActions()).toContainEqual({ type: RESET_FIELD_ERROR, payload: { field: 'email' } });
  });

  it('should dispatch RESET_PASSWORD_REQUEST when requesting reset password', () => {
    store.dispatch(resetGenericErrorAction());
    expect(store.getActions()).toContainEqual({ type: RESET_GENERIC_ERROR });
  });

  it('should dispatch RESET_PASSWORD_REQUEST when requesting reset password', () => {
    mock.onPut(url).reply(200, successData);
    store.dispatch(resetPasswordAction(email, password, confirmPassword, token));
    expect(store.getActions()).toContainEqual({ type: RESET_PASSWORD_REQUEST });
  });

  it('should dispatch RESET_PASSWORD_SUCCESS when reset password is successful', () => {
    mock.onPut(url).reply(200, successData);
    store.dispatch(resetPasswordAction(email, password, confirmPassword, token))
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: RESET_PASSWORD_SUCCESS,
          payload: { message: 'Foo Bar.' },
        });
      });
  });

  it('should dispatch PASSWORD_RESET_FAIL when reset password fails', () => {
    mock.onPut(url).reply(400, { errors: { error: 'Foo Bar.' } });
    store.dispatch(resetPasswordAction(email, password, confirmPassword, token))
      .catch(() => {
        expect(store.getActions()).toContainEqual({
          type: PASSWORD_RESET_FAIL,
          payload: { errors: { error: 'Foo Bar.' } },
        });
      });
  });
});
