import likeDislikeReducer, { initialState } from './reducer';
import {
  LIKE_ARTICLE, DISLIKE_ARTICLE, UNDISLIKE_ARTICLE,
  UNLIKE_ARTICLE, FETCH_REACTIONS, FETCH_REACTIONS_SUCCESS,
  LIKE_DISLIKE_ERROR,
} from './types';

const action = {
  type: FETCH_REACTIONS_SUCCESS,
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
};

const likeAction = {
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
};

const dislikeAction = {
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
};

const undislikeAction = {
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
};

const unlikeAction = {
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
};

const errorAction = {
  type: LIKE_DISLIKE_ERROR,
  payload: {
    errors: {},
  },
};

describe('the like and dislike reducer', () => {
  it('should return the initial state', () => {
    expect(likeDislikeReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LIKE_ARTICLE', () => {
    expect(likeDislikeReducer(undefined, likeAction)).toEqual({
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
    expect(likeDislikeReducer(undefined, dislikeAction)).toEqual({
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
    expect(likeDislikeReducer(undefined, undislikeAction)).toEqual({
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
    expect(likeDislikeReducer(undefined, unlikeAction)).toEqual({
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

  it('should handle LIKE_DISLIKE_ERROR', () => {
    expect(likeDislikeReducer(undefined, errorAction)).toEqual({
      ...initialState,
      errors: {
        errors: {},
      },
    });
  });

  it('should handle FETCH_REACTIONS', () => {
    expect(likeDislikeReducer(undefined, {
      type: FETCH_REACTIONS,
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
      ...initialState, isFetching: true,
    });
  });

  it('should handle FETCH_REACTIONS_SUCCESS', () => {
    expect(likeDislikeReducer(undefined, action)).toEqual({
      ...initialState, ...action.payload,
    });
  });
});
