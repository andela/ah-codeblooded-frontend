import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAIL,
  REFRESH_STATS_REQUEST,
  REFRESH_STATS_SUCCESS,
  REFRESH_STATS_FAIL,
} from './types';

const initialState = {
  stats: [],
  error: null,
  isFetching: false,
  isRefreshing: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATS_REQUEST:
      return {
        ...state,
        stats: [],
        error: null,
        isFetching: true,
        isRefreshing: false,
      };

    case FETCH_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload.stats,
        error: null,
        isFetching: false,
        isRefreshing: false,
      };

    case FETCH_STATS_FAIL:
      return {
        ...state,
        stats: [],
        error: action.payload.error,
        isFetching: false,
        isRefreshing: false,
      };

    case REFRESH_STATS_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: false,
        isRefreshing: true,
      };

    case REFRESH_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload.stats,
        error: null,
        isFetching: false,
        isRefreshing: false,
      };

    case REFRESH_STATS_FAIL:
      return {
        ...state,
        error: action.payload.error,
        isFetching: false,
        isRefreshing: false,
      };

    default:
      return state;
  }
};
