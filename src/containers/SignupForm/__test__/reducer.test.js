import {
  REGISTER_USER, REGISTER_ERROR, REGISTER_SUCCESS,
} from '../state/types';
import reducer from '../state/reducer';
import {
  data, state, errors,
} from './mock';

const initialState = state;
const action = { payload: {} };

describe('register Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(reducer(initialState, action))
      .toEqual(initialState);
  });
  it('should handle REGISTER_SUCCESS', () => {
    action.type = REGISTER_SUCCESS,
    action.payload = data,
    expect(reducer(initialState, action)).toEqual({
      user: data,
      errors: [],
      success: true,
      isRegistering: false,
    });
  });

  it('should change success value to true', () => {
    action.type = REGISTER_SUCCESS;
    expect(reducer(initialState, action).success).toEqual(true);
  });
  it('should handle REGISTER_USER', () => {
    action.type = REGISTER_USER;
    expect(reducer(initialState, action).isRegistering).toEqual(true);
  });

  it('should handle REGISTER_ERROR', () => {
    action.type = REGISTER_ERROR;
    action.payload = errors;
    expect(reducer(initialState, action)).toEqual({
      user: {},
      errors,
      success: false,
      isRegistering: false,
    });
  });
  it('should change isRegistering value to false', () => {
    action.type = REGISTER_ERROR;
    expect(reducer(initialState, action).isRegistering).toEqual(false);
  });
});
