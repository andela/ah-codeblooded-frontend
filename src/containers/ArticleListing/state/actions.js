import api from '../../../utils/api';
import {
  FETCH_ARTICLES,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS,
  FETCH_MORE_ARTICLES_SUCCESS,
} from './types';

export const fetchingArticles = listName => (
  { type: FETCH_ARTICLES, payload: { listName } }
);

export const articlesFetchingSuccessful = (articles, listName, fetchMore) => (
  {
    type: fetchMore ? FETCH_MORE_ARTICLES_SUCCESS : FETCH_ARTICLES_SUCCESS,
    payload: { data: articles, listName },
  }
);

export const articlesFetchingFailed = (errors, listName) => (
  { type: FETCH_ARTICLES_FAILURE, payload: { errors, listName } }
);

export const articlesFetchAction = (url, params, listName, fetchMore = false) => (dispatch) => {
  dispatch(fetchingArticles(listName));
  return api.get(url, { params })
    .then((response) => {
      dispatch(articlesFetchingSuccessful(response.data.data.article, listName, fetchMore));
    }).catch((error) => {
      dispatch(articlesFetchingFailed(error.response, listName));
    });
};
