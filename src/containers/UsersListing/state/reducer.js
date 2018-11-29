import {
  FETCHING_USERS,
  FETCHING_USERS_SUCCESS,
  FETCHING_USERS_FAILURE,
} from "./type";

const usersListInitialState = {
  users: [],
  isFetching: false,
  errors: [],
};

const initialState = {

};

export const usersReducer = (state = usersListInitialState, action) => {
  const { type, payload: { listName, data } } = action;
  switch (type) {
  case FETCHING_USERS:
    return { ...state, isFetching: true };
  case FETCHING_USERS_SUCCESS:
    return {
      ...state,
      isFetching: false,
      users: data[listName] || [],
      // following: action.payload.data.following.map(user => user.username),
    };
  case FETCHING_USERS_FAILURE:
    return { ...state, isFetching: false, errors: data };
  default:
    return state;
  }
};

export default (state = initialState, action) => {
  if (action.payload) {
    const { payload: { listName } } = action;
    const currentState = state[listName];

    return { ...state, [listName]: usersReducer(currentState, action) };
  } return state;
};
