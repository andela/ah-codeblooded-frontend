import {
  LIKE_COMMENT,
  LIKE_COMMENT_ERROR,
  DISLIKE_COMMENT,
  DISLIKE_COMMENT_ERROR,
  FETCH_COMMENT_ERROR,
  FETCH_COMMENT_SUCCESS,
} from './types';

export const reactionsInitialState = {
  likes: {
    count: 0,
    me: false,
  },
  dislikes: {
    count: 0,
    me: false,
  },
};

const initialState = {
  error: "",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_COMMENT: {
      return {
        ...state,
      };
    }
    case LIKE_COMMENT_ERROR: {
      return { ...state, error: action.payload };
    }
    case DISLIKE_COMMENT: {
      return {
        ...state,
      };
    }
    case DISLIKE_COMMENT_ERROR: {
      return {
        ...state, error: action.payload,
      };
    }
    case FETCH_COMMENT_SUCCESS: {
      const { payload, id } = action.payload;
      const { reactions } = state;
      return {
        ...state, reactions: { ...reactions, [id]: { ...payload.reactions } },
      };
    }
    case FETCH_COMMENT_ERROR: {
      return {
        ...state, error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
