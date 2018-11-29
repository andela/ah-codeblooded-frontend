import {
  COMMENTING,
  COMMENTING_FAILED,
  COMMENTING_SUCCESS,
  FETCHING_COMMENT_AUTHORS_SUCCESS,
  UPDATING_COMMENT,
  UPDATING_COMMENT_FAILED,
  UPDATING_COMMENT_SUCCESS,
} from './types';

export const initialState = {
  isCommenting: false,
  updatingComment: false,
  errors: null,
  commentingSuccess: false,
  authors: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
  case COMMENTING:
    return { ...state, isCommenting: true };
  case COMMENTING_SUCCESS:
    return { ...state, isCommenting: false, commentingSuccess: true };
  case COMMENTING_FAILED:
    return { ...state, isCommenting: false, errors: action.payload };
  case FETCHING_COMMENT_AUTHORS_SUCCESS:
    return { ...state, authors: action.payload };
  case UPDATING_COMMENT:
    return { ...state, updatingComment: true };
  case UPDATING_COMMENT_SUCCESS:
    return { ...state, updatingComment: false };
  case UPDATING_COMMENT_FAILED:
    return { ...state, updatingComment: false };
  default:
    return state;
  }
};
