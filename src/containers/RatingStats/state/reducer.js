import { FETCH_RATINGS, FETCH_RATINGS_SUCCESS, FETCH_RATINGS_FAILURE } from './types';

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

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RATINGS_SUCCESS: {
      const {
        rating: { each_rating: eachRating },
      } = initialState;
      const {
        payload: {
          data: { each_rating: newEachRating },
        },
      } = action;
      return {
        ...state,
        isFetching: false,
        rating: {
          ...action.payload.data,
          each_rating: { ...eachRating, ...newEachRating },
        },
      };
    }
    case FETCH_RATINGS: {
      return { ...state, isFetching: true };
    }
    case FETCH_RATINGS_FAILURE:
      return { ...state, isFetching: false, errors: action.payload };
    default:
      return state;
  }
};
