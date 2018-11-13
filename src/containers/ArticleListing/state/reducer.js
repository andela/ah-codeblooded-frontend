import { FETCH_ARTICLES, FETCH_ARTICLES_FAILURE, FETCH_ARTICLES_SUCCESS } from './types';

export const initialState = {
  articles: {
    results: [],
  },
  isFetching: true,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTICLES:
      return { ...state, isFetching: true };
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, articles: action.payload, isFetching: false };
    case FETCH_ARTICLES_FAILURE:
      return { ...state, errors: action.payload, isFetching: false };
    default:
      return state;
  }
};
