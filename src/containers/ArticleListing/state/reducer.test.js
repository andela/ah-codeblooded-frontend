import articles, { initialState } from './reducer';
import { article, testReducer } from '../../../utils/testHelpers';
import { articlesFetchingFailed, articlesFetchingSuccessful, fetchingArticles } from './actions';

const test = (action, value, result) => {
  testReducer(action, value, result, articles, initialState);
};
describe("Articles reducer", () => {
  it('should append an article on success', () => {
    test(articlesFetchingSuccessful(article), 'articles', article);
    test(articlesFetchingFailed(['some errors']), 'errors', ['some errors']);
    test(fetchingArticles(), 'isFetching', true);
  });
});
