import {
  article, axiosMock, comment, mockStore,
} from '../../../utils/testHelpers';
import { getURL } from '../../../utils/api';
import {
  deleteCommentAction, deletingComment, deletingCommentFailed,
  fetchCommentsAction,
  fetchingComments, fetchingCommentsFailed,
} from './actions';

const store = mockStore({});
const url = getURL(`articles/${article.slug}/comments/${comment.id}`);

describe('<CommentThread/> actions', () => {
  beforeEach(() => {
    axiosMock.reset();
    store.clearActions();
  });
  it('should fetch comments based on the slug of the article', () => {
    axiosMock.onGet(url).reply(200, { data: { comment: { results: [comment] } } });
    store.dispatch(fetchCommentsAction(article.slug, comment.id))
      .then(() => {
        expect(store.getActions()).toContainEqual(fetchingComments(comment.id, 1));
      });
  });

  it('should delete comment based on the id of the comment', () => {
    axiosMock.onDelete(url).reply(200, {});
    store.dispatch(deleteCommentAction(article.slug, comment.parent, comment.id))
      .then(() => {
        expect(store.getActions()).toContainEqual(deletingComment());
      });
  });

  it('should show an error on delete comment failed', () => {
    axiosMock.onDelete(url).reply(403, {});
    store.dispatch(deleteCommentAction(article.slug, comment.parent, comment.id))
      .catch(() => {
        expect(store.getActions()).toContainEqual(deletingCommentFailed());
      });
  });

  it('should show an error on fetching comments failed', () => {
    axiosMock.onGet(url).reply(403, {});
    store.dispatch(fetchCommentsAction(article.slug, comment.id))
      .catch(() => {
        expect(store.getActions()).toContainEqual(fetchingCommentsFailed({}, comment.id, 1));
      });
  });
});
