import { articlesFetchAction } from './actions';
import { article, axiosMock, mockStore } from '../../../utils/testHelpers';
import { getURL } from '../../../utils/api';
import { FETCH_ARTICLES_SUCCESS } from './types';

const store = mockStore({});

describe('Article Listing actions', () => {
  afterEach(() => {
    axiosMock.reset();
  });

  it('should dispatch a ARTICLE_FETCHING action', () => {
    axiosMock.onGet(getURL('articles/')).reply(
      200, { data: { article: [article] } },
    );
    return store.dispatch(articlesFetchAction()).then(() => {
      expect(store.getActions()).toContainEqual(
        { type: FETCH_ARTICLES_SUCCESS, payload: [article] },
      );
    });
  });
});
