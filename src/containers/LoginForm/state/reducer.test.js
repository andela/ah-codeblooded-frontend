import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_START } from './types';
import reducer from './reducer';


const initialState = {
  data: {},
  errors: [],
  success: false,
  isLogingIn: false,
};

const action = {
  payload: {},
};

describe('login reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(reducer(initialState, action))
      .toEqual(initialState);
  });

  it('should handle LOGIN_START', () => {
    action.type = LOGIN_START;
    expect(reducer(initialState, action)).toEqual({
      data: {},
      errors: [],
      success: false,
      isLogingIn: true,
    });
  });

  it('should handle LOGIN_SUCCESS', () => {
    action.type = LOGIN_SUCCESS;
    expect(reducer(initialState, action)).toEqual({
      data: {},
      errors: [],
      success: true,
      isLogingIn: false,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    action.type = LOGIN_FAILURE;
    expect(reducer(initialState, action)).toEqual({
      data: {},
      errors: {},
      success: false,
      isLogingIn: false,
    });
  });

  it('should change islogingin value to false', () => {
    action.type = LOGIN_FAILURE;
    expect(reducer(initialState, action).isLogingIn).toEqual(false);
  });

  it('should change islogingin value to false', () => {
    action.type = LOGIN_SUCCESS;
    expect(reducer(initialState, action).isLogingIn).toEqual(false);
  });
});
