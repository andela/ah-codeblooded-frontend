import {
  state,
  action,
  message,
  reactions,
} from './mock';

import reducer from './reducer';
import {
  LIKE_COMMENT,
  LIKE_COMMENT_ERROR,
  DISLIKE_COMMENT,
  DISLIKE_COMMENT_ERROR,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_ERROR,
} from './types';

describe('reducer', () => {
  it('should return initial state when there is no action', () => {
    expect(reducer(state, action)).toEqual({
      error: "",
      reactions: {
        dislikes: { count: 0, me: false },
        likes: { count: 0, me: false },
      },
    });
  });

  it('should handle LIKE_COMMENT', () => {
    action.type = LIKE_COMMENT;
    expect(reducer(state, action)).toEqual({
      error: "",
      reactions: {
        dislikes: { count: 0, me: false },
        likes: { count: 0, me: false },
      },
    });
  });

  it('should handle LIKE_COMMENT_ERROR)', () => {
    action.type = LIKE_COMMENT_ERROR;
    action.payload = message;
    action.payload = expect(reducer(state, action)).toEqual({
      error: message,
      reactions: {
        dislikes: { count: 0, me: false },
        likes: { count: 0, me: false },
      },
    });
  });

  it('should handle DISLIKE_COMMENT', () => {
    action.type = DISLIKE_COMMENT;
    expect(reducer(state, action)).toEqual({
      error: "",
      reactions: {
        dislikes: { count: 0, me: false },
        likes: { count: 0, me: false },
      },
    });
  });

  it('should handle DISLIKE_COMMENT_ERROR)', () => {
    action.type = DISLIKE_COMMENT_ERROR;
    action.payload = message;
    action.payload = expect(reducer(state, action)).toEqual({
      error: message,
      reactions: {
        dislikes: { count: 0, me: false },
        likes: { count: 0, me: false },
      },
    });
  });

  it('should handle FETCH_COMMENT_SUCCESS)', () => {
    action.type = FETCH_COMMENT_SUCCESS;
    action.payload = { id: 1, payload: reactions };
    action.payload = expect(reducer({ error: "" }, action)).toEqual({
      error: "",
      reactions: {
        1: {
          ...reactions.reactions,
        },
      },
    });
  });

  it('should handle FETCH_COMMENT_ERROR)', () => {
    action.type = FETCH_COMMENT_ERROR;
    action.payload = message;
    action.payload = expect(reducer(state, action)).toEqual({
      error: message,
      reactions: {
        dislikes: { count: 0, me: false },
        likes: { count: 0, me: false },
      },
    });
  });
});
