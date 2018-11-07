import {
  LIKE_ARTICLE, LIKE_DISLIKE_ERROR, DISLIKE_ARTICLE, UNLIKE_ARTICLE, UNDISLIKE_ARTICLE,
} from './types';

import api from '../../../utils/api';


export const likeArticle = slug => (dispatch) => {
  api.post(`articles/${slug}/like/`)
    .then((res) => {
      dispatch({
        type: LIKE_ARTICLE,
        payload: res.data.reactions.likes,
      });
    }).catch((error) => {
      dispatch({
        type: LIKE_DISLIKE_ERROR,
        payload: error,
      });
    });
};

export const dislikeArticle = slug => (dispatch) => {
  api.post(`articles/${slug}/dislike/`)
    .then((res) => {
      dispatch({
        type: DISLIKE_ARTICLE,
        payload: res.data.reactions.dislikes,
      });
    }).catch((error) => {
      dispatch({
        type: LIKE_DISLIKE_ERROR,
        payload: error,
      });
    });
};

export const undislikeArticle = slug => (dispatch) => {
  api.delete(`articles/${slug}/dislike/`)
    .then((res) => {
      dispatch({
        type: UNDISLIKE_ARTICLE,
        payload: res.data.reactions.dislikes,
      });
    }).catch((error) => {
      dispatch({
        type: LIKE_DISLIKE_ERROR,
        payload: error,
      });
    });
};

export const unlikeArticle = slug => (dispatch) => {
  api.delete(`articles/${slug}/like/`)
    .then((res) => {
      dispatch({
        type: UNLIKE_ARTICLE,
        payload: res.data.reactions.likes,
      });
    }).catch((error) => {
      dispatch({
        type: LIKE_DISLIKE_ERROR,
        payload: error,
      });
    });
};
