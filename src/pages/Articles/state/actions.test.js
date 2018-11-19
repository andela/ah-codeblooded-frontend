import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {
  articleFetchFailure, articleFetchSuccess, articleSaveFailure,
  articleSaveSuccess, publishingArticle, fetchingArticle,
  getArticleAction, saveArticleAction, savingArticle,
} from './actions';
import { article, articleCRUD } from '../../../utils/testHelpers';
import api, { getURL } from '../../../utils/api';
import {
  ARTICLE_FETCH, ARTICLE_PUBLISH, ARTICLE_SAVE,
} from './types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const axiosMock = new MockAdapter(api);


describe('Article actions', () => {
  let store;
  beforeEach(() => {
    store = mockStore(articleCRUD);
  });
  afterEach(() => {
    store.clearActions();
    axiosMock.reset();
  });

  it('fetches an article by slug and dispatches ARTICLE_FETCH_SUCCESS', () => {
    axiosMock.onGet(getURL(`articles/${article.slug}/`))
      .reply(200, { data: article });

    store.dispatch(getArticleAction(article.slug)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });

  it('saves an article by slug and dispatches ARTICLE_SAVE_SUCCESS', () => {
    axiosMock.onPost(getURL('articles/'))
      .reply(201, { data: { ...article, slug: null } });
    return store.dispatch(saveArticleAction(article)).then(() => {
      expect(store.getActions()).toContainEqual({ type: ARTICLE_SAVE });
    });
  });

  it('publishes an article', () => {
    axiosMock.onPut(getURL(`articles/${article.slug}/`))
      .reply(200, { data: { ...article, published: true } });
    return store.dispatch(saveArticleAction({ ...article, published: true })).then(() => {
      expect(store.getActions()).toContainEqual({ type: ARTICLE_PUBLISH });
    });
  });

  it('fails to get an article', () => {
    axiosMock.onGet(getURL(`articles/${article.slug}/`))
      .reply(400, { data: article });
    return store.dispatch(getArticleAction(article.slug)).then(() => {
      expect(store.getActions()).toContainEqual({ type: ARTICLE_FETCH });
    });
  });

  it('dispatches correct actions', () => {
    const actions = [articleFetchFailure,
      articleSaveSuccess, articleSaveSuccess, articleSaveFailure,
      publishingArticle, fetchingArticle, articleFetchSuccess, savingArticle];
    actions.forEach((action) => {
      store.dispatch(action);
    });
    expect(store.getActions()).toMatchSnapshot();
  });
});
