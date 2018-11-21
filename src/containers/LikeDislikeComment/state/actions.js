import {
  likeComment,
  likeCommentError,
  dislikeComment,
  dislikeCommentError,
  CommentStatError,
  CommentStatSuccess,
} from './actionCreators';
import api from '../../../utils/api';
import { message } from './types';

export const likeCommentAction = (slug, id) => dispatch => api.put(`articles/${slug}/comments/${id}/likes`)
  .then(() => {
    dispatch(likeComment());
  })
  .catch((error) => {
    const msg = error.response && message;
    dispatch(likeCommentError(msg));
  });

export const dislikeCommentAction = (slug, id) => dispatch => api.put(`articles/${slug}/comments/${id}/dislikes`)
  .then(() => {
    dispatch(dislikeComment());
  })
  .catch((error) => {
    const msg = error.response && message;
    dispatch(dislikeCommentError(msg));
  });

export const fetchCommentStat = (slug, id) => dispatch => api.get(`articles/${slug}/comments/${id}`)
  .then((res) => {
    dispatch(CommentStatSuccess({
      reactions: {
        likes: res.data.data.comment.comment.likes,
        dislikes: res.data.data.comment.comment.dislikes,
      },
    }, id));
  }).catch((error) => {
    const msg = error.response && message;
    dispatch(CommentStatError(msg));
  });
