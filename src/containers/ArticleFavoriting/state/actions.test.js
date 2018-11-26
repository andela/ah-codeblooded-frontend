import * as actions from './actions';
import * as types from './types';
import { mockStore, axiosMock } from '../../../utils/testHelpers';
import { getURL } from '../../../utils/api';

const payload = {
  favourite: false,
};

const errors = {
  errors: {
    error: ['This is an error'],
  },
};

const store = mockStore({});

describe('Favourite and unfavourite actions', () => {
  it('should create a request action to favourite an action', () => {
    const expectedAction = {
      type: types.FAVORITE_ARTICLE_SUCCESS,
      payload,
    };
    expect(actions.favoriteArticleSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action to dispatch errors to the user', () => {
    const expectedAction = {
      type: types.FAVORITE_UNFAVORITE_ERROR,
      errors,
    };
    expect(actions.favoriteUnfavoriteFailure(errors)).toEqual(expectedAction);
  });

  it('should favourite an available article using its slug', () => {
    axiosMock.onPost(getURL('articles/thisIsASlug/favourite/')).reply(200, payload);
    store.dispatch(actions.favoriteArticleAction('thisIsASlug')).then(() => {
      expect(store.getActions()).toContainEqual({
        type: actions.FAVORITE_ARTICLE_SUCCESS,
        payload,
      });
    });
  });

  it('should unfavourite an article using its slug', () => {
    axiosMock.onDelete(getURL('articles/thisIsASlug/favourite/')).reply(200, payload);
    store.dispatch(actions.favoriteArticleAction('thisisASlug')).then(() => {
      expect(store.getActions()).toContainEqual({
        type: actions.FAVORITE_ARTICLE_SUCCESS,
        payload,
      });
    });
  });

  it('should show an error on favouriting an article', () => {
    axiosMock.onPost(getURL('articles/thisIsASlug/favourite/')).reply(403, { errors: 'something' });
    store.dispatch(actions.favoriteArticleAction('articles/thisIsASlug/favourite')).then(() => {
      expect(store.getActions()).toContainEqual({
        type: actions.FAVORITE_UNFAVORITE_ERROR,
        payload,
      });
    });
  });

  it('should show an error on unfavouriting an article', () => {
    axiosMock.onDelete(getURL('articles/thisIsASlug/favourite/')).reply(403, { errors: 'something' });
    store.dispatch(actions.favoriteArticleAction('articles/thisIsASlug/favourite')).then(() => {
      expect(store.getActions()).toContainEqual({
        type: actions.FAVORITE_UNFAVORITE_ERROR,
        payload,
      });
    });
  });
});
