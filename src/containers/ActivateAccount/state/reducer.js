import {
  ACTIVATE_SUCCESS,
  ACTIVATE_ERROR,
  ACTIVATE_USER,
} from './types';

const initialState = {
  isActivating: true,
  activationSuccess: false,
  activationFailed: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIVATE_USER: {
      return {
        ...state,
        isActivating: false,
      };
    }
    case ACTIVATE_SUCCESS: {
      return {
        ...state,
        activationSuccess: true,
      };
    }
    case ACTIVATE_ERROR: {
      return {
        ...state,
        activationFailed: true,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
