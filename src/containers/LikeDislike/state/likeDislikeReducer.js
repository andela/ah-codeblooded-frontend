import {
  LIKE_ARTICLE, LIKE_DISLIKE_ERROR, DISLIKE_ARTICLE, UNDISLIKE_ARTICLE, UNLIKE_ARTICLE,
} from './types';

const initialState = {
  likes: {},
  unlike: {},
  dislikes: {},
  undislike: {},

};

const likeDislikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_ARTICLE: {
      return { ...state, like: action.payload };
    }
    case DISLIKE_ARTICLE: {
      return { ...state, dislike: action.payload };
    }
    case LIKE_DISLIKE_ERROR: {
      return { ...state, errors: action.payload };
    }
    case UNDISLIKE_ARTICLE: {
      return { ...state, undislike: action.payload };
    }
    case UNLIKE_ARTICLE: {
      return { ...state, unlike: action.payload };
    }
    default: {
      return state;
    }
  }
};

export default likeDislikeReducer;
