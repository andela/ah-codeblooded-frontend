import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import api from '../../../utils/api';
import config from '../../../utils/config';
import { forgotPasswordAction, resendLinkAction } from './actions';
import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  RESEND_RESET_LINK,
} from './types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

let store;

describe('The ForgotPassword actions', () => {
  const mock = new MockAdapter(api);
  const url = `${config.BASE_URL}account/forgot_password/`;
  const email = 'email@mail.com';
  const successData = { message: 'Foo Bar.' };

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
    mock.reset();
  });

  it('should dispatch FORGOT_PASSWORD_REQUEST when requesting forgot password', () => {
    mock.onPost(url).reply(200, successData);
    store.dispatch(forgotPasswordAction());
    expect(store.getActions()).toContainEqual({ type: FORGOT_PASSWORD_REQUEST });
  });

  it('should dispatch FORGOT_PASSWORD_SUCCESS when forgot password is successful', () => {
    mock.onPost(url).reply(200, successData);
    store.dispatch(forgotPasswordAction(email))
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: FORGOT_PASSWORD_SUCCESS,
          payload: { message: 'Foo Bar.' },
        });
      });
  });

  it('should dispatch FORGOT_PASSWORD_FAIL when forgot password fails', () => {
    mock.onPost(url).reply(400, { message: { error: 'Foo Bar.' } });
    store.dispatch(forgotPasswordAction(email))
      .catch(() => {
        expect(store.getActions()).toContainEqual({
          type: FORGOT_PASSWORD_FAIL,
          payload: { error: { error: 'Foo Bar.' } },
        });
      });
  });

  it('should dispatch RESEND_RESET_LINK on resendLinkAction', () => {
    store.dispatch(resendLinkAction());
    expect(store.getActions()).toContainEqual({
      type: RESEND_RESET_LINK,
    });
  });
});
