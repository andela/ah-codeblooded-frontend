import reducer from './reducer';

import {
  PASSWORD_RESET_FAIL,
  RESET_FIELD_ERROR,
  RESET_GENERIC_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
} from './types';

describe('The ResetPassword reducer', () => {
  const initialState = {
    resetPassword: {},
  };

  const action = { payload: {} };

  it('should return the initial state when there is no action', () => {
    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it('should handle RESET_GENERIC_ERROR', () => {
    action.type = RESET_GENERIC_ERROR;
    expect(reducer(initialState.resetPassword, action))
      .toEqual({ errors: { error: null } });
  });

  it('should handle RESET_FIELD_ERROR', () => {
    action.type = RESET_FIELD_ERROR;
    action.payload = { field: 'email' };
    expect(reducer(initialState.resetPassword, action))
      .toEqual({ errors: { email: null } });
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    action.type = RESET_PASSWORD_REQUEST;
    expect(reducer(initialState.resetPassword, action))
      .toEqual({ isRequesting: true });
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    action.type = RESET_PASSWORD_SUCCESS;
    action.payload = { message: 'Foo Bar' };
    expect(reducer(initialState.resetPassword, action))
      .toEqual({
        resetSuccessful: true, isRequesting: false, message: 'Foo Bar',
      });
  });

  it('should handle PASSWORD_RESET_FAIL', () => {
    action.type = PASSWORD_RESET_FAIL;
    action.payload = { errors: { error: 'Foo Bar' } };
    expect(reducer(initialState.resetPassword, action))
      .toEqual({
        errors: { error: 'Foo Bar' }, isRequesting: false, resetSuccessful: false,
      });
  });
});
