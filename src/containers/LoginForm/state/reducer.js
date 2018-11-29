import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_START } from './types';

const initialState = {
  data: {},
  errors: {},
  success: false,
  isLogingIn: false,
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
  case LOGIN_START: {
    return { ...state, isLogingIn: true };
  }
  case LOGIN_SUCCESS: {
    return {
      ...state, data: payload, success: true, isLogingIn: false,
    };
  }
  case LOGIN_FAILURE: {
    return { ...state, errors: payload, isLogingIn: false };
  }
  default: {
    return state;
  }
  }
};

export default loginReducer;
