import articles, { articleListingState, initialState } from './reducer';
import { article, testReducer } from '../../../utils/testHelpers';
import { articlesFetchingFailed, articlesFetchingSuccessful, fetchingArticles } from './actions';

const test = (action, value, result, state = initialState) => {
  testReducer(action, value, result, articles, state);
};

describe("Articles reducer", () => {
  it('should append an article on success', () => {
    test(articlesFetchingSuccessful(article, 'articles'), 'articles', {
      ...articleListingState,
      articles: article,
      isFetching: false,
    });
    test(articlesFetchingFailed(['some errors'], 'articles'), 'articles', {
      ...articleListingState,
      errors: ['some errors'],
      isFetching: false,
    });
    test(fetchingArticles('articles'), 'articles', {
      ...articleListingState,
      isFetching: true,
    });
    test(articlesFetchingSuccessful({ results: [article] }, 'articles', true), 'articles', {
      ...articleListingState,
      articles: { results: [article] },
      isFetching: false,
    }, { articles: articleListingState });
  });
});
