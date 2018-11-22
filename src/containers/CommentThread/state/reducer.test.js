import { testReducer } from '../../../utils/testHelpers';
import comments, { commentsInitialState, initialState } from './reducer';
import {
  fetchingComments,
  fetchingCommentsFailed,
  fetchingCommentsSuccess,
} from './actions';

const data = {
  results: [],
};
const test = (action, value, result, state = initialState) => {
  testReducer(action, value, result, comments, state);
};

describe('<CommentThread/> reducer', () => {
  it('should return an appropriate state based on the action', () => {
    test(fetchingComments(), 'isFetching', false);
    test(fetchingCommentsSuccess({ ...data }), 'isFetching', false);
    test(fetchingComments(null, 2), 'isFetching', false);
    test(fetchingCommentsSuccess({ ...data }, 8, 2), 'threads', {
      8:
        { ...commentsInitialState, isFetchingMore: false, threads: {} },
    });
    test(fetchingCommentsFailed(null, null, 2), 'isFetchingMore', false);
    test(fetchingCommentsFailed(), 'isFetchingMore', false);
    test({ type: 'DEFAULT_ACTION', payload: { parent: null } }, 'results', []);
    test({ type: 'DEFAULT_ACTION' }, 'results', []);
  });
});
