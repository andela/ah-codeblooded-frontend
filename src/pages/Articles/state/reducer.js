import {
  ARTICLE_FETCH, ARTICLE_FETCH_SUCCESS, ARTICLE_FETCH_FAILURE,
  ARTICLE_SAVE, ARTICLE_SAVE_FAILURE, ARTICLE_SAVE_SUCCESS, ARTICLE_PUBLISH,
} from './types';
import editorState, { createFromText } from '../Create/state/editorState';


export const initialState = {
  editorState,
  isSaving: false,
  isSaved: true,
  isFetched: false,
  isFetching: true,
  isPageLoading: true,
  isPublishing: false,
  isPublished: false,
  errorFetching: false,
  errors: null,
  article: {
    author: {

    },
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ARTICLE_SAVE:
      return { ...state, isSaving: true };
    case ARTICLE_SAVE_SUCCESS: {
      return {
        ...state,
        article: action.payload,
        editorState: JSON.parse(action.payload.body),
        isSaving: false,
        isPublished: action.payload.published,
        isPublishing: false,
        isSaved: true,
      };
    }
    case ARTICLE_SAVE_FAILURE:
      return {
        ...state,
        isSaved: false,
        isSaving: false,
        errorFetching: true,
        errors: action.errors,
      };
    case ARTICLE_FETCH_SUCCESS: {
      let editorContent;
      const article = action.payload;
      try {
        editorContent = JSON.parse(article.body);
      } catch (err) {
        editorContent = createFromText(article.body);
        article.body = JSON.stringify(editorContent);
      }
      return {
        ...state,
        article: action.payload,
        isSaved: true,
        editorState: JSON.parse(action.payload.body),
        isFetching: false,
      };
    }
    case ARTICLE_PUBLISH:
      return {
        ...state,
        isPublishing: true,
      };
    case ARTICLE_FETCH_FAILURE:
      return {
        ...state,
        errors: action.errors,
        isFetched: false,
        errorFetching: true,
      };
    case ARTICLE_FETCH:
      return { ...state, isFetching: true };
    default: return state;
  }
};
