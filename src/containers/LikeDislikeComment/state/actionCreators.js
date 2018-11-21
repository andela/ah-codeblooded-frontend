import {
  DISLIKE_COMMENT,
  DISLIKE_COMMENT_ERROR,
  LIKE_COMMENT,
  LIKE_COMMENT_ERROR,
  FETCH_COMMENT_ERROR,
  FETCH_COMMENT_SUCCESS,
} from './types';

export const likeComment = () => ({
  type: LIKE_COMMENT,
});

export const likeCommentError = payload => ({
  type: LIKE_COMMENT_ERROR,
  payload,
});

export const dislikeComment = () => ({
  type: DISLIKE_COMMENT,
});

export const dislikeCommentError = payload => ({
  type: DISLIKE_COMMENT_ERROR,
  payload,
});

export const CommentStatSuccess = payload => ({
  type: FETCH_COMMENT_SUCCESS,
  payload,
});

export const CommentStatError = payload => ({
  type: FETCH_COMMENT_ERROR,
  payload,
});
