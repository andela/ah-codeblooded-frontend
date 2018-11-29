import { NETWORK_ERROR_DETECTED, NO_NETWORK_ERROR } from "./types";

const initialState = {
  networkError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case NETWORK_ERROR_DETECTED:
    return {
      ...state,
      networkError: true,
    };
  case NO_NETWORK_ERROR:
    return {
      ...state,
      networkError: false,
    };
  default:
    return state;
  }
};
