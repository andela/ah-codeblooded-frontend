import {
  FETCHING_COMMENTS, FETCHING_COMMENTS_FAILED,
  FETCHING_COMMENTS_SUCCESS,
  FETCHING_MORE_COMMENTS, FETCHING_MORE_COMMENTS_FAILED,
  FETCHING_MORE_COMMENTS_SUCCESS,
} from './types';

export const commentsInitialState = {
  count: 0,
  total_pages: 0,
  results: [

  ],
  isFetching: false,
  isFetchingMore: false,
  deletingComment: false,
  errors: [],
};

export const initialState = {
  ...commentsInitialState,
  threads: {},
};

const threadReducer = (state = initialState, type, data) => {
  switch (type) {
    case FETCHING_COMMENTS:
      return { ...state, isFetching: true };
    case FETCHING_COMMENTS_SUCCESS:
      return { ...state, ...data, isFetching: false };
    case FETCHING_MORE_COMMENTS:
      return { ...state, isFetchingMore: true, isFetching: false };
    case FETCHING_MORE_COMMENTS_SUCCESS: {
      const current = state.results.map(a => ({ ...a }));
      if (current) current.push(...data.results);
      return {
        ...state,
        ...data,
        results: current,
        isFetchingMore: false,
        isFetching: false,
      };
    }
    case FETCHING_MORE_COMMENTS_FAILED: {
      return { ...state, isFetchingMore: false, errors: data };
    }
    case FETCHING_COMMENTS_FAILED: {
      return { ...state, isFetching: false, errors: data };
    }
    default: return state;
  }
};


export default (state = initialState, action) => {
  if (action.payload) {
    const { parent } = action.payload;
    if (parent === null) {
      return threadReducer(state, action.type, action.payload.data);
    }
    const { threads } = state;
    return {
      ...state,
      threads: {
        ...threads,
        [parent]:
            threadReducer(state.threads[parent], action.type, action.payload.data),
      },
    };
  }
  return state;
};
