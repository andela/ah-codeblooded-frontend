import {
  VIEW_USER_PROFILE,
  USER_PROFILE_ERROR,
  EDIT_USER_PROFILE,
  EDIT_PROFILE_ERROR,
} from './types';

const initialState = {
  profile: {},
  success: false,
  failure: false,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case VIEW_USER_PROFILE:
    return { ...state, success: true, profile: action.payload.profile };
  case USER_PROFILE_ERROR:
    return { ...state, failure: true, errors: action.payload };
  case EDIT_USER_PROFILE:
    return { ...state, success: true, profile: action.payload };
  case EDIT_PROFILE_ERROR:
    return { ...state, failure: true, errors: action.payload };
  default:
    return state;
  }
};
