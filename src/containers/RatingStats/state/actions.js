import { FETCH_RATINGS, FETCH_RATINGS_SUCCESS, FETCH_RATINGS_FAILURE } from './types';
import api from '../../../utils/api';

export const fetchingRatings = () => ({
  type: FETCH_RATINGS,
});

export const fetchingRatingSuccess = ratings => ({
  type: FETCH_RATINGS_SUCCESS,
  payload: ratings,
});

export const fetchingRatingsFailure = errors => ({
  type: FETCH_RATINGS_FAILURE,
  payload: errors,
});

export const fetchRatingsAction = slug => (dispatch) => {
  dispatch(fetchingRatings());
  return api
    .get(`articles/${slug}/ratings/`)
    .then((data) => {
      dispatch(fetchingRatingSuccess(data.data));
    })
    .catch((errors) => {
      dispatch(fetchingRatingsFailure(errors.response));
    });
};
