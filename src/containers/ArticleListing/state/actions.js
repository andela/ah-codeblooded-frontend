import api from '../../../utils/api';
import { FETCH_ARTICLES, FETCH_ARTICLES_FAILURE, FETCH_ARTICLES_SUCCESS } from './types';

export const fetchingArticles = () => ({ type: FETCH_ARTICLES });

export const articlesFetchingSuccessful = articles => (
  { type: FETCH_ARTICLES_SUCCESS, payload: articles }
);

export const articlesFetchingFailed = errors => ({ type: FETCH_ARTICLES_FAILURE, payload: errors });

export const articlesFetchAction = params => (dispatch) => {
  dispatch(fetchingArticles());
  return api.get('articles/', { params })
    .then((response) => {
      dispatch(articlesFetchingSuccessful(response.data.data.article));
    }).catch((response) => {
      dispatch(articlesFetchingFailed(response.response));
    });
};
