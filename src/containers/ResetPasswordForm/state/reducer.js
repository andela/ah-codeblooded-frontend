import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  PASSWORD_RESET_FAIL,
  RESET_FIELD_ERROR,
  RESET_GENERIC_ERROR,
} from './types';

export default (state = {}, action) => {
  switch (action.type) {
    case RESET_GENERIC_ERROR:
      return {
        ...state,
        errors: { ...state.errors, error: null },
      };

    case RESET_FIELD_ERROR:
      return {
        ...state,
        errors: { ...state.errors, [action.payload.field]: null },
      };

    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        isRequesting: true,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        resetSuccessful: true,
        isRequesting: false,
      };

    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        ...action.payload,
        resetSuccessful: false,
        isRequesting: false,
      };

    default:
      return state;
  }
};
