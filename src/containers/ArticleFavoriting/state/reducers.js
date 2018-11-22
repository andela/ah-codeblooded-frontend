import { FAVORITE_ARTICLE_SUCCESS, FAVORITE_UNFAVORITE_ERROR } from './types';

export const initialState = {
  success: false,
  failure: false,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case FAVORITE_ARTICLE_SUCCESS:
    return { ...state, success: true, favorite: action.payload };
  case FAVORITE_UNFAVORITE_ERROR:
    return { ...state, failure: true, errors: action.payload };
  default:
    return state;
  }
};
