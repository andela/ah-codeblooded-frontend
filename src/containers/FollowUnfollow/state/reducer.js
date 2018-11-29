import {
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  UNFOLLOW_USER_SUCCESS,
  FETCH_FOLLOWERS_SUCCESS,
  FETCH_FOLLOWERS_FAILURE,
} from "./type";

const initialState = {
  errors: {},
  following: false,
};

const followUnfollowReducer = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_FOLLOWERS_SUCCESS: {
    return {
      ...state,
      following: true,
    };
  }

  case FETCH_FOLLOWERS_FAILURE: {
    return {
      ...state,
      following: false,
    };
  }

  case FOLLOW_USER_SUCCESS: {
    return {
      ...state,
      payload: action.payload,
      following: true,
    };
  }
  case FOLLOW_USER_FAILURE:
    return {
      ...state,
      errors: action.payload.errors,
      following: false,
    };
  case UNFOLLOW_USER_SUCCESS: {
    return {
      ...state, following: false,
    };
  }
  case UNFOLLOW_USER_FAILURE:
    return {
      ...state,
      errors: action.payload.errors,
      following: false,
    };
  default:
    return state;
  }
};

export default followUnfollowReducer;
