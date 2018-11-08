import likeDislikeReducer, { initialState } from './likeDislikeReducer';
import {
  LIKE_ARTICLE, DISLIKE_ARTICLE, UNDISLIKE_ARTICLE, UNLIKE_ARTICLE,
} from './types';

describe('like/dislike reducer', () => {
  it('should return the initial state', () => {
    expect(likeDislikeReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle LIKE_ARTICLE', () => {
    expect(likeDislikeReducer(undefined, {
      type: LIKE_ARTICLE,
      payload: {
        likes: {
          count: 1,
          me: true,
        },
      },
    })).toEqual({
      ...initialState,
      likes: {
        likes: {
          count: 1,
          me: true,
        },
      },
    });
  });
  it('should handle DISLIKE_ARTICLE', () => {
    expect(likeDislikeReducer(undefined, {
      type: DISLIKE_ARTICLE,
      payload: {
        dislikes: {
          count: 1,
          me: true,
        },
      },
    })).toEqual({
      ...initialState,
      dislikes: {
        dislikes: {
          count: 1,
          me: true,
        },
      },
    });
  });
  it('should handle UNDISLIKE_ARTICLE', () => {
    expect(likeDislikeReducer(undefined, {
      type: UNDISLIKE_ARTICLE,
      payload: {
        dislikes: {
          count: 0,
          me: false,
        },
      },
    })).toEqual({
      ...initialState,
      undislike: {
        dislikes: {
          count: 0,
          me: false,
        },
      },
    });
  });
  it('should handle UNLIKE_ARTICLE', () => {
    expect(likeDislikeReducer(undefined, {
      type: UNLIKE_ARTICLE,
      payload: {
        likes: {
          count: 0,
          me: false,
        },
      },
    })).toEqual({
      ...initialState,
      unlike: {
        likes: {
          count: 0,
          me: false,
        },
      },
    });
  });
//   it('should handle LIKE_DISLIKE_ERROR');
});
