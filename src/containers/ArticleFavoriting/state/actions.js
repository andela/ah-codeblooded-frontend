import api from '../../../utils/api';

import { FAVORITE_ARTICLE_SUCCESS, FAVORITE_UNFAVORITE_ERROR } from './types';

export const favoriteArticleSuccess = payload => ({
  type: FAVORITE_ARTICLE_SUCCESS,
  payload,
});

export const favoriteUnfavoriteFailure = errors => ({
  type: FAVORITE_UNFAVORITE_ERROR,
  errors,
});

export const favoriteArticleAction = (slug, favourited) => (dispatch) => {
  const url = `articles/${slug}/favourite/`;
  const axios = favourited ? api.delete(url) : api.post(url);
  return axios
    .then(res => dispatch(favoriteArticleSuccess(res.data.favourited)))
    .catch(errors => dispatch(favoriteUnfavoriteFailure(errors)));
};
