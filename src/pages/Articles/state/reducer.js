import { LOCATION_CHANGE } from 'react-router-redux';
import {
  ARTICLE_FETCH, ARTICLE_FETCH_SUCCESS, ARTICLE_FETCH_FAILURE,
  ARTICLE_SAVE, ARTICLE_SAVE_FAILURE, ARTICLE_SAVE_SUCCESS, ARTICLE_PUBLISH,
} from './types';
import editorState from '../CreateUpdate/state/editorState';


export const initialState = {
  editorState,
  isSaving: false,
  isSaved: false,
  isFetched: false,
  isFetching: false,
  isPageLoading: false,
  isPublishing: false,
  isPublished: false,
  article: {
    author: {

    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      return { ...initialState };
    case ARTICLE_SAVE:
      return { ...state, isSaving: true };
    case ARTICLE_SAVE_SUCCESS:
      return {
        ...state,
        article: action.payload,
        editorState: JSON.parse(action.payload.body),
        isSaving: false,
        isPublished: action.payload.published,
        isPublishing: false,
      };
    case ARTICLE_SAVE_FAILURE:
      return {
        ...state,
        isSaved: false,
      };
    case ARTICLE_FETCH_SUCCESS:
      return {
        ...state,
        article: action.payload,
        isSaved: true,
        editorState: JSON.parse(action.payload.body),
        isFetching: false,
      };
    case ARTICLE_PUBLISH:
      return {
        ...state,
        isPublishing: true,
      };
    case ARTICLE_FETCH_FAILURE:
      return {
        ...state,
        isFetched: false,
      };
    case ARTICLE_FETCH:
      return { ...state, isFetching: true };
    default: return state;
  }
};
