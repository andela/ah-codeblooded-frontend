import {
  COMMENTING,
  COMMENTING_FAILED,
  COMMENTING_SUCCESS, FETCHING_COMMENT_AUTHORS_SUCCESS,
  FETCHING_COMMENT_AUTHORS, UPDATING_COMMENT, UPDATING_COMMENT_SUCCESS, UPDATING_COMMENT_FAILED,
} from './types';
import api from '../../../utils/api';
import { fetchCommentsAction } from '../../CommentThread/state/actions';

export const updatingComment = () => ({
  type: UPDATING_COMMENT,
});

export const updatingCommentSuccess = () => ({
  type: UPDATING_COMMENT_SUCCESS,
});

export const updatingCommentFailed = () => ({
  type: UPDATING_COMMENT_FAILED,
});

export const fetchingCommentAuthors = () => ({
  type: FETCHING_COMMENT_AUTHORS,
});

export const fetchingCommentAuthorsSuccess = authors => ({
  type: FETCHING_COMMENT_AUTHORS_SUCCESS,
  payload: authors,
});

export const commentingAction = () => ({
  type: COMMENTING,
});

export const commentingSuccess = comment => ({
  type: COMMENTING_SUCCESS,
  payload: comment,
});

export const commentingFailed = errors => ({
  type: COMMENTING_FAILED,
  payload: errors,
});

export const fetchCommentAuthorsAction = slug => (dispatch) => {
  dispatch(fetchingCommentAuthors());
  return api.get(`articles/${slug}/comments/authors`)
    .then((response) => {
      dispatch(fetchingCommentAuthorsSuccess(response.data.data.users));
    });
};

export const updateCommentAction = (slug, comment,
  commentId, mentions, successCallback) => (dispatch) => {
  dispatch(updatingComment());
  return api.put(`articles/${slug}/comments/${commentId}`, {
    comment:
      { body: comment },
    mentions,
  })
    .then((response) => {
      dispatch(updatingCommentSuccess());
      successCallback(response.data.data.comment);
      dispatch(fetchCommentsAction(slug, response.data.data.comment.parent));
    }).catch(() => {
      dispatch(updatingCommentFailed());
    });
};

export const commentAction = (
  slug,
  comment,
  commentId = null,
  mentions,
  successCallback,
) => (dispatch) => {
  dispatch(commentingAction());
  return api.post(`articles/${slug}/comments${commentId ? `/${commentId}` : ''}`,
    { comment: { body: comment }, mentions })
    .then((response) => {
      dispatch(commentingSuccess(response.data.data.comment));
      successCallback();
      dispatch(fetchCommentsAction(slug, commentId));
    }).catch((response) => {
      dispatch(commentingFailed(response.response));
    });
};
