import reducer from './reducers';
import { profile, state, errors } from './mock';
import {
  USER_PROFILE_ERROR, EDIT_PROFILE_ERROR, EDIT_USER_PROFILE, VIEW_USER_PROFILE,
} from './types';

const initialState = state;
const action = { payload: {} };

describe('User profiles __test__', () => {
  it('should return profile initial state when no action dispatched', () => {
    expect(reducer(initialState, action))
      .toEqual(initialState);
  });

  it('should dispatch VIEW_USER_PROFILE action', () => {
    action.type = VIEW_USER_PROFILE;
    action.payload.profile = profile;
    expect(reducer(initialState, action)).toEqual({
      profile,
      errors: [],
      success: true,
      failure: false,
    });
  });

  it('should change success to true when the VIEW_USER_PROFILE is dispatched', () => {
    action.type = VIEW_USER_PROFILE;
    expect(reducer(initialState, action).success).toEqual(true);
  });

  it('should dispatch USER_PROFILE_ERROR when there is an error', () => {
    action.type = USER_PROFILE_ERROR;
    action.payload = errors;
    expect(reducer(initialState, action)).toEqual({
      profile: {},
      errors,
      success: false,
      failure: true,
    });
  });

  it('should change failure to true when USER_PROFILE_ERROR is dispatched', () => {
    action.type = USER_PROFILE_ERROR;
    expect(reducer(initialState, action).failure).toEqual(true);
  });

  it('should dispatch EDIT_USER_PROFILE action', () => {
    action.type = EDIT_USER_PROFILE;
    action.payload = profile;
    expect(reducer(initialState, action)).toEqual({
      profile,
      errors: [],
      success: true,
      failure: false,
    });
  });

  it('should change success to true when the EDIT_USER_PROFILE is dispatched', () => {
    action.type = EDIT_USER_PROFILE;
    expect(reducer(initialState, action).success).toEqual(true);
  });

  it('should dispatch EDIT_PROFILE_ERROR when there is an error', () => {
    action.type = EDIT_PROFILE_ERROR;
    action.payload = errors;
    expect(reducer(initialState, action)).toEqual({
      profile: {},
      errors,
      success: false,
      failure: true,
    });
  });

  it('should change failure to true when EDIT_PROFILE_ERROR is dispatched', () => {
    action.type = EDIT_PROFILE_ERROR;
    expect(reducer(initialState, action).failure).toEqual(true);
  });
});
