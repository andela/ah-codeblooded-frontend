import {
  ARTICLE_FETCH, ARTICLE_FETCH_FAILURE, ARTICLE_FETCH_SUCCESS, ARTICLE_PUBLISH,
  ARTICLE_SAVE, ARTICLE_SAVE_FAILURE, ARTICLE_SAVE_SUCCESS,
} from './types';
import api from '../../../utils/api';
import {
  pageLoadedAction,
  pageLoadingAction,
} from '../../../containers/NavBar/state/actions';

export const savingArticle = () => ({
  type: ARTICLE_SAVE,
});

export const fetchingArticle = () => ({
  type: ARTICLE_FETCH,
});

export const articleSaveSuccess = article => ({
  type: ARTICLE_SAVE_SUCCESS,
  payload: article,
});

export const articleSaveFailure = errors => ({
  type: ARTICLE_SAVE_FAILURE,
  errors,
});

export const articleFetchSuccess = article => ({
  type: ARTICLE_FETCH_SUCCESS,
  payload: article,
});

export const articleFetchFailure = errors => ({
  type: ARTICLE_FETCH_FAILURE,
  errors,
});

export const publishingArticle = () => ({ type: ARTICLE_PUBLISH });

export const getArticleAction = slug => (dispatch) => {
  dispatch(fetchingArticle());
  dispatch(pageLoadingAction());
  return api.get(`articles/${slug}/`).then((data) => {
    dispatch(articleFetchSuccess(data.data.data.article));
    dispatch(pageLoadedAction());
  }).catch((errors) => {
    dispatch(pageLoadedAction());
    dispatch(articleFetchFailure(errors.response));
  });
};

const dispatchPublishing = (article, dispatch) => {
  if (article.published) {
    dispatch(publishingArticle());
  } else {
    dispatch(savingArticle());
  }
};

export const saveArticleAction = (article, successCallback = null) => (dispatch) => {
  dispatchPublishing(article, dispatch);
  const axios = article.slug ? api.put(`articles/${article.slug}/`, { article })
    : api.post('articles/', { article });

  return axios.then((data) => {
    dispatch(articleSaveSuccess(data.data.data.article));
    if (article.published) {
      successCallback();
    }
  }).catch((errors) => {
    dispatch(articleSaveFailure(errors));
  });
};
