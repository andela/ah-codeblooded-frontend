import likeDislikeReducer, { initialState } from './reducer';
import {
  LIKE_ARTICLE, LIKE_DISLIKE_ERROR, DISLIKE_ARTICLE, UNDISLIKE_ARTICLE,
  UNLIKE_ARTICLE, FETCH_REACTIONS, FETCH_REACTIONS_SUCCESS,
} from './types';

describe('the like and dislike reducer', () => {
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
        dislikes: {
          count: 0,
          me: false,
        },
      },
    })).toEqual({
      ...initialState,
      likes: {
        count: 1,
        me: true,
      },
      dislikes: {
        count: 0,
        me: false,
      },
    });
  });
  it('should handle DISLIKE_ARTICLE', () => {
    expect(likeDislikeReducer(undefined, {
      type: DISLIKE_ARTICLE,
      payload: {
        likes: {
          count: 0,
          me: false,
        },
        dislikes: {
          count: 1,
          me: true,
        },
      },
    })).toEqual({
      ...initialState,
      likes: {
        count: 0,
        me: false,
      },
      dislikes: {
        count: 1,
        me: true,
      },
    });
  });
  it('should handle UNDISLIKE_ARTICLE', () => {
    expect(likeDislikeReducer(undefined, {
      type: UNDISLIKE_ARTICLE,
      payload: {
        likes: {
          count: 0,
          me: false,
        },
        dislikes: {
          count: 0,
          me: false,
        },
      },
    })).toEqual({
      ...initialState,
      likes: {
        count: 0,
        me: false,
      },
      dislikes: {
        count: 0,
        me: false,
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
        dislikes: {
          count: 0,
          me: false,
        },
      },
    })).toEqual({
      ...initialState,
      likes: {
        count: 0,
        me: false,
      },
      dislikes: {
        count: 0,
        me: false,
      },
    });
  });
//   it('should handle LIKE_DISLIKE_ERROR');
});
