import {
  LIKE_ARTICLE, LIKE_DISLIKE_ERROR, DISLIKE_ARTICLE, UNDISLIKE_ARTICLE,
  UNLIKE_ARTICLE, FETCH_REACTIONS, FETCH_REACTIONS_SUCCESS,
} from './types';

export const initialState = {
  likes: {
    count: 0,
    me: false,
  },
  dislikes: {
    count: 0,
    me: false,
  },
  isFetching: false,
};

const likeDislikeReducer = (state = initialState, action) => {
  switch (action.type) {
  case LIKE_ARTICLE:
    return { ...state, likes: action.payload.likes, dislikes: action.payload.dislikes };
  case FETCH_REACTIONS_SUCCESS:
    return { ...state, ...action.payload };
  case FETCH_REACTIONS:
    return { ...state, isFetching: true };
  case DISLIKE_ARTICLE:
    return { ...state, dislikes: action.payload.dislikes, likes: action.payload.likes };
  case LIKE_DISLIKE_ERROR:
    return { ...state, errors: action.payload };
  case UNDISLIKE_ARTICLE:
    return { ...state, dislikes: action.payload.dislikes, likes: action.payload.likes };
  case UNLIKE_ARTICLE:
    return { ...state, likes: action.payload.likes, dislikes: action.payload.dislikes };
  default:
    return state;
  }
};

export default likeDislikeReducer;
