import {
  FETCH_FOLLOWERS_FAILURE,
  FETCH_FOLLOWERS_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_SUCCESS,
} from './type';
import reducer from './reducer';


const initialState = {
  errors: {},
  following: false,
};

const action = {
  payload: {},
};

describe('follow reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(reducer(initialState, action))
      .toEqual(initialState);
  });

  it('should handle FETCH_FOLLOWERS_SUCCESS', () => {
    action.type = FETCH_FOLLOWERS_SUCCESS;
    expect(reducer(initialState, action)).toEqual({
      errors: {},
      following: true,
    });
  });

  it('should handle FETCH_FOLLOWERS_FAILURE', () => {
    action.type = FETCH_FOLLOWERS_FAILURE;
    expect(reducer(initialState, action)).toEqual({
      errors: {},
      following: false,
    });
  });

  it('should handle FOLLOW_USER_SUCCESS', () => {
    action.type = FOLLOW_USER_SUCCESS;
    expect(reducer(initialState, action)).toEqual({
      errors: {},
      following: true,
      payload: {},
    });
  });

  it('should handle FOLLOW_USER_FAILURE', () => {
    action.type = FOLLOW_USER_FAILURE;
    expect(reducer(initialState, action)).toEqual({
      following: false,
    });
  });

  it('should handle UNFOLLOW_USER_SUCCESS', () => {
    action.type = UNFOLLOW_USER_SUCCESS;
    expect(reducer(initialState, action)).toEqual({
      errors: {},
      following: false,
    });
  });

  it('should handle FOLLOW_USER_FAILURE', () => {
    action.type = UNFOLLOW_USER_FAILURE;
    expect(reducer(initialState, action)).toEqual({
      following: false,
    });
  });
});
