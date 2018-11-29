import {
  FETCHING_USERS,
  FETCHING_USERS_FAILURE,
} from './type';
import reducer from './reducer';

const usersListInitialState = {
  users: [],
  isFetching: false,
  errors: [],
};

const action = {
  payload: {},
};

const payload = "";

describe('user listing reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(reducer(usersListInitialState, payload))
      .toEqual(usersListInitialState);
  });

  it('should handle FETCHING_USERS', () => {
    action.type = FETCHING_USERS;
    expect(reducer(usersListInitialState, action)).toEqual({
      users: [],
      isFetching: false,
      errors: [],
      undefined: { errors: [], isFetching: true, users: [] },
    });
  });

  it('should handle FETCHING_USERS_FAILURE', () => {
    action.type = FETCHING_USERS_FAILURE;
    expect(reducer(usersListInitialState, action)).toEqual({
      users: [],
      isFetching: false,
      errors: [],
      undefined: { errors: undefined, isFetching: false, users: [] },
    });
  });
});
