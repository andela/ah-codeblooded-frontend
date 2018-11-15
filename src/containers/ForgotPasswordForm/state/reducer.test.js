import reducer from './reducer';
import {
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  RESEND_RESET_LINK,
} from './types';

describe('The ForgotPassword reducer', () => {
  const initialState = {
    forgotPassword: {},
  };

  const action = { payload: {} };

  it('should return the initial state when there is no action', () => {
    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it('should handle FORGOT_PASSWORD_REQUEST', () => {
    action.type = FORGOT_PASSWORD_REQUEST;
    expect(reducer(initialState.forgotPassword, action))
      .toEqual({ error: null, isRequesting: true, message: null });
  });

  it('should handle FORGOT_PASSWORD_SUCCESS', () => {
    action.type = FORGOT_PASSWORD_SUCCESS;
    action.payload = { message: 'Foo Bar' };
    expect(reducer(initialState.forgotPassword, action))
      .toEqual({ isRequesting: false, linkSent: true, message: 'Foo Bar' });
  });

  it('should handle FORGOT_PASSWORD_FAIL', () => {
    action.type = FORGOT_PASSWORD_FAIL;
    action.payload = { error: { error: 'Foo Bar' } };
    expect(reducer(initialState.forgotPassword, action))
      .toEqual({ linkSent: false, isRequesting: false, error: { error: 'Foo Bar' } });
  });

  it('should handle RESEND_RESET_LINK', () => {
    action.type = RESEND_RESET_LINK;
    expect(reducer(initialState.forgotPassword, action))
      .toEqual({
        linkSent: false, message: null, error: null, isRequesting: false,
      });
  });
});
