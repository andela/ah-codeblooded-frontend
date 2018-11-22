import { comment, testReducer } from '../../../utils/testHelpers';
import commentEditor, { initialState } from './reducer';
import {
  commentingAction,
  commentingFailed,
  commentingSuccess,
  fetchingCommentAuthorsSuccess, updatingComment, updatingCommentFailed, updatingCommentSuccess,
} from './actions';


const test = (action, value, result, state = initialState) => {
  testReducer(action, value, result, commentEditor, state);
};
describe("<CommentEditor/> reducer", () => {
  it('should return an appropriate state based on the action', () => {
    test(commentingAction(), 'isCommenting', true);
    test(commentingSuccess(comment), 'commentingSuccess', true);
    test(commentingFailed(), 'isCommenting', false);
    test(fetchingCommentAuthorsSuccess(['gitaumoses4']), 'authors', ['gitaumoses4']);
    test(updatingComment(), 'updatingComment', true);
    test(updatingCommentSuccess(), 'updatingComment', false);
    test(updatingCommentFailed(), 'updatingComment', false);
  });
});
