import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAIL,
  REFRESH_STATS_REQUEST,
  REFRESH_STATS_SUCCESS,
  REFRESH_STATS_FAIL,
} from './types';
import reducer from './reducer';
import { successData } from "./mock";

describe('The Stats reducer', () => {
  const initialState = {
    stats: {
      stats: [],
      error: null,
      isFetching: false,
      isRefreshing: false,
    },
  };

  const action = { payload: {} };

  it('should return the initial state when there is no action ', () => {
    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it('should handle FETCH_STATS_REQUEST', () => {
    action.type = FETCH_STATS_REQUEST;
    expect(reducer(initialState.stats, action)).toEqual({
      ...initialState.stats,
      isFetching: true,
    });
  });

  it('should handle FETCH_STATS_SUCCESS', () => {
    action.type = FETCH_STATS_SUCCESS;
    action.payload.stats = successData.stats;
    expect(reducer(initialState.stats, action)).toEqual({
      ...initialState.stats,
      stats: successData.stats,
    });
  });

  it('should handle FETCH_STATS_FAIL', () => {
    action.type = FETCH_STATS_FAIL;
    action.payload.error = 'Whoops!';
    expect(reducer(initialState.stats, action)).toEqual({
      ...initialState.stats,
      error: 'Whoops!',
    });
  });

  it('should handle REFRESH_STATS_REQUEST', () => {
    action.type = REFRESH_STATS_REQUEST;
    expect(reducer(initialState.stats, action)).toEqual({
      ...initialState.stats,
      isRefreshing: true,
    });
  });

  it('should handle REFRESH_STATS_SUCCESS', () => {
    action.type = REFRESH_STATS_SUCCESS;
    action.payload.stats = successData.stats;
    expect(reducer(initialState.stats, action)).toEqual({
      ...initialState.stats,
      stats: successData.stats,
    });
  });

  it('should handle FETCH_STATS_FAIL', () => {
    action.type = REFRESH_STATS_FAIL;
    action.payload.error = 'Whoops!';
    expect(reducer(initialState.stats, action)).toEqual({
      ...initialState.stats,
      error: 'Whoops!',
    });
  });
});
