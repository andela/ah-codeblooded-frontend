import {
  likeComment,
  likeCommentError,
  dislikeComment,
  dislikeCommentError,
  CommentStatSuccess,
  CommentStatError,
} from './actionCreators';
import { message, payload } from './mock';


describe('action creators', () => {
  it('should return a type, LIKE_COMMENT', () => {
    expect(likeComment()).toEqual({ type: "LIKE_COMMENT" });
  });

  it('should return an object with type and payload', () => {
    expect(likeCommentError(message)).toEqual({
      payload: "Something went wrong. Try again",
      type: "LIKE_COMMENT_ERROR",
    });
  });

  it('should return a type, DISLIKE_COMMENT', () => {
    expect(dislikeComment()).toEqual({ type: "DISLIKE_COMMENT" });
  });

  it('should return an object with type and payload', () => {
    expect(dislikeCommentError(message)).toEqual({
      payload: "Something went wrong. Try again",
      type: "DISLIKE_COMMENT_ERROR",
    });
  });

  it('should return an object with type and payload', () => {
    expect(CommentStatSuccess(payload)).toEqual({
      payload: {
        likes: {
          count: 0,
          me: false,
        },
      },
      type: "FETCH_COMMENT_SUCCESS",
    });
  });

  it('should return an object with type and payload', () => {
    expect(CommentStatError(message)).toEqual({
      payload: "Something went wrong. Try again",
      type: "FETCH_COMMENT_ERROR",
    });
  });
});
