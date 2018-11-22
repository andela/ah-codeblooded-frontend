import ratingStats from './reducer';
import { FETCH_RATINGS, FETCH_RATINGS_SUCCESS, FETCH_RATINGS_FAILURE } from './types';

describe('Rating reducer', () => {
  const initialState = {
    rating: {
      avg_rating: 0,
      total_user: 0,
      each_rating: {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
    },
    isFetching: true,
    errors: null,
  };
  const val = {
    errors: null,
    isFetching: true,
    rating: {
      avg_rating: 0,
      each_rating: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      total_user: 0,
    },
  };
  const eachRating = { each_rating: 5 };

  const action = {
    payload: {
      data: { eachRating },
    },
  };

  it('should return the initial fetching ratings state when there is no action', () => {
    expect(ratingStats(initialState, action)).toEqual(initialState);
  });
  it('should handle FETCH_RATINGS', () => {
    action.type = FETCH_RATINGS;
    expect(ratingStats(initialState, action)).toEqual(val);
  });
  it('should handle FETCH_RATINGS_SUCCESS', () => {
    action.type = FETCH_RATINGS_SUCCESS;
    action.payload = { data: val.rating };
    expect(ratingStats(initialState, action)).toEqual({ ...val, isFetching: false });
  });
  it('should handle FETCH_RATINGS_FAILURE', () => {
    action.type = FETCH_RATINGS_FAILURE;
    action.payload = { errors: 'You cannot rate your own article' };
    expect(ratingStats(initialState, action)).toEqual({
      ...val,
      isFetching: false,
      errors: action.payload,
    });
  });
});
