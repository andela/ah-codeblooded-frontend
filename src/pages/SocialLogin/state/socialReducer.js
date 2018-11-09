import { SUCCESS_LOGIN, FAIL_LOGIN } from "./types";

const initialState = {
  state: {},
  success: false,
  failure: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_LOGIN:
      return { ...state, success: true, state: action.payload };

    case FAIL_LOGIN:
      return { ...state, failure: true, errors: action.payload };
    default:
      return state;
  }
};
