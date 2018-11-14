import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_SUCCESS,
  RESEND_RESET_LINK,
} from './types';

export default (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        error: null,
        message: null,
        isRequesting: true,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        linkSent: true,
        isRequesting: false,
      };

    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
        ...action.payload,
        linkSent: false,
        isRequesting: false,
      };

    case RESEND_RESET_LINK:
      return {
        ...state,
        linkSent: false,
        message: null,
        error: null,
        isRequesting: false,
      };

    default:
      return state;
  }
};
