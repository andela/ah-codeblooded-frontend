import {
  REGISTER_USER,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} from './types';

const initialState = {
  user: {},
  errors: [],
  success: false,
  isRegistering: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
  case REGISTER_USER: {
    return { ...state, isRegistering: true, errors: [] };
  }
  case REGISTER_SUCCESS: {
    return {
      ...state,
      user: action.payload,
      success: true,
      isRegistering: false,
    };
  }
  case REGISTER_ERROR: {
    return {
      ...state,
      errors: action.payload,
      isRegistering: false,
    };
  }

  default:
    return state;
  }
};

export default reducer;
