import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS,
  FETCH_MORE_ARTICLES_SUCCESS,
} from './types';

export const articleListingState = {
  articles: {
    results: [],
  },
  isFetching: true,
  errors: null,
};

export const initialState = {

};

const listReducer = (state = articleListingState, action) => {
  switch (action.type) {
  case FETCH_ARTICLES:
    return {
      ...state,
      isFetching: true,
    };
  case FETCH_ARTICLES_SUCCESS: {
    return {
      ...state, articles: action.payload.data, isFetching: false,
    };
  }
  case FETCH_MORE_ARTICLES_SUCCESS: {
    const results = state.articles.results.map(a => ({ ...a }));
    if (results) results.push(...action.payload.data.results);
    return {
      ...state,
      articles: { ...action.payload.data, results },
      isFetching: false,
    };
  }
  case FETCH_ARTICLES_FAILURE:
    return {
      ...state,
      errors: action.payload.errors,
      isFetching: false,
    };
  default:
    return state;
  }
};
export default (state = initialState, action) => {
  const { listName } = action.payload || { listName: 'articles' };
  return { ...state, [listName]: listReducer(state[listName], action) };
};
