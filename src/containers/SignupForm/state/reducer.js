import { REGISTER_USER, REGISTER_ERROR } from './types';

const initialState = {
  user: {},
  errors: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER: {
      return { ...state, user: action.payload };
    }
    case REGISTER_ERROR: {
      return { ...state, errors: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
