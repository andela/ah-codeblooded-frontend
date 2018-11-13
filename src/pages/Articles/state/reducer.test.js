import articleEditor from './reducer';
import {
  savingArticle, articleSaveSuccess, articleFetchSuccess,
  fetchingArticle, articleFetchFailure, articleSaveFailure,
} from './actions';
import editorState from '../CreateUpdate/state/editorState';
import { article, testReducer } from '../../../utils/testHelpers';


const initialState = {
  editorState,
  isSaving: false,
  isFetching: false,
  isPageLoading: false,
  article: {},
};

const setActionAndState = (action, value, result) => {
  testReducer(action, value, result, articleEditor, initialState);
};
describe('<ArticleEditor/> reducer', () => {
  it('sets isSaving to true when creating article', () => {
    setActionAndState(savingArticle(), 'isSaving', true);
  });
  it('sets isSaving to false after successful save', () => {
    setActionAndState(articleSaveSuccess(article), 'isSaving', false);
  });
  it('sets isFetching to false after successful fetch', () => {
    setActionAndState(articleFetchSuccess(article), 'isFetching', false);
  });
  it('sets isFetching to true on fetch', () => {
    setActionAndState(fetchingArticle(), 'isFetching', true);
  });
  it('sets isFetched to false on fetch', () => {
    setActionAndState(articleFetchFailure(), 'isFetched', false);
  });
  it('sets isSaved to false on fetch', () => {
    setActionAndState(articleSaveFailure(), 'isSaved', false);
  });
});
