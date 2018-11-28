import {
  DELETING_COMMENT,
  DELETING_COMMENT_FAILED,
  DELETING_COMMENT_SUCCESSFUL,
  FETCHING_COMMENTS,
  FETCHING_COMMENTS_FAILED,
  FETCHING_COMMENTS_SUCCESS,
  FETCHING_MORE_COMMENTS,
  FETCHING_MORE_COMMENTS_FAILED,
  FETCHING_MORE_COMMENTS_SUCCESS,
} from './types';
import api from '../../../utils/api';

export const deletingComment = () => ({
  type: DELETING_COMMENT,
});

export const deletingCommentSuccessful = () => ({
  type: DELETING_COMMENT_SUCCESSFUL,
});

export const deletingCommentFailed = () => ({
  type: DELETING_COMMENT_FAILED,
});

export const fetchingComments = (parentId, page = 1) => ({
  type: page === 1 ? FETCHING_COMMENTS : FETCHING_MORE_COMMENTS,
  payload: { parent: parentId },
});

export const fetchingCommentsSuccess = (data, parentId, page = 1) => ({
  type: page === 1 ? FETCHING_COMMENTS_SUCCESS : FETCHING_MORE_COMMENTS_SUCCESS,
  payload: { data, parent: parentId },
});

export const fetchingCommentsFailed = (errors, parentId, page = 1) => ({
  type: page === 1 ? FETCHING_COMMENTS_FAILED : FETCHING_MORE_COMMENTS_FAILED,
  payload: { data: errors, parent: parentId },
});

export const fetchCommentsAction = (slug, parentId = null, page = 1) => (dispatch) => {
  dispatch(fetchingComments(parentId, page));
  return api.get(`articles/${slug}/comments${parentId ? `/${parentId}` : ''}`, { params: { page } })
    .then((response) => {
      dispatch(fetchingCommentsSuccess(response.data.data.comment, parentId, page));
    }).catch((error) => {
      dispatch(fetchingCommentsFailed(error.response, parentId, page));
    });
};

export const deleteCommentAction = (slug, parentId, commentId, successCallback) => (dispatch) => {
  dispatch(deletingComment());
  return api.delete(`articles/${slug}/comments/${commentId}`).then(() => {
    dispatch(deletingCommentSuccessful());
    dispatch(fetchCommentsAction(slug, parentId));
    successCallback();
  }).catch(() => {
    dispatch(deletingCommentFailed());
  });
};
