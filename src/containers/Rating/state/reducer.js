import { CURRENT_RATE, UPDATE_RATE, RATE_ERROR } from './types';

const initialState = {
  state: {},
  errors: {},
  success: false,
  failure: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case CURRENT_RATE:
    return { ...state, success: true, state: action.payload };
  case UPDATE_RATE:
    return { ...state, success: true, state: action.payload.data.rating };
  case RATE_ERROR:
    return { ...state, failure: true, state: action.payload.message };
  default:
    return state;
  }
};
