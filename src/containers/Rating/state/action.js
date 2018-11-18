import api from '../../../utils/api';
import { CURRENT_RATE, UPDATE_RATE, RATE_ERROR } from './types';

export const start = value => ({
  type: CURRENT_RATE,
  payload: value,
});

export const success = response => ({
  type: UPDATE_RATE,
  payload: response,
});

export const fail = error => ({
  type: RATE_ERROR,
  payload: error.message,
});
const slug = window.location.pathname.split('/').pop();

export const rateArticle = val => dispatch => api
  .put(`articles/${slug}/rate/`, {
    rating: {
      rating: val,
    },
  })
  .then((res) => {
    dispatch(success(res.data));
  })
  .catch((error) => {
    dispatch(fail(error.response.data));
  });

export default rateArticle;

export const currentRate = () => dispatch => api.get(`articles/${slug}/rate/`).then((response) => {
  const data = response.data.data.rating;
  dispatch(start(data));
});
