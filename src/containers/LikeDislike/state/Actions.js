import {
  LIKE_ARTICLE, LIKE_DISLIKE_ERROR, DISLIKE_ARTICLE, UNLIKE_ARTICLE, UNDISLIKE_ARTICLE,
  FETCH_REACTIONS_SUCCESS, FETCH_REACTIONS,
} from './types';

import api from '../../../utils/api';

export const fetchingReactions = () => ({ type: FETCH_REACTIONS });

export const fetchReactionSuccess = payload => ({ type: FETCH_REACTIONS_SUCCESS, payload });

export const fetchReactions = slug => (dispatch) => {
  dispatch(fetchingReactions());

  return api.get(`articles/${slug}/reactions/`)
    .then((res) => {
      dispatch(fetchReactionSuccess(res.data.reactions));
    }).catch((error) => {
      dispatch({
        type: LIKE_DISLIKE_ERROR,
        payload: error,
      });
    });
};
export const likeArticle = (slug, liked) => (dispatch) => {
  const url = `articles/${slug}/like/`;
  const axios = liked ? api.delete(url) : api.post(url);
  return axios.then((res) => {
    dispatch({
      type: liked ? UNLIKE_ARTICLE : LIKE_ARTICLE,
      payload: res.data.reactions,
    });
  }).catch((error) => {
    dispatch({
      type: LIKE_DISLIKE_ERROR,
      payload: error.response.data,
    });
  });
};
let uri;
export const dislikeArticle = (slug, disliked) => (dispatch) => {
  uri = `articles/${slug}/dislike/`;
  const axios = disliked ? api.delete(uri) : api.post(uri);
  return axios.then((res) => {
    dispatch({
      type: disliked ? UNDISLIKE_ARTICLE : DISLIKE_ARTICLE,
      payload: res.data.reactions,
    });
  }).catch((error) => {
    dispatch({
      type: LIKE_DISLIKE_ERROR,
      payload: error.response.data,
    });
  });
};
