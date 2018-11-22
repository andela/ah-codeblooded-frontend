import {
  article, axiosMock, comment, mockStore,
} from '../../../utils/testHelpers';
import { getURL } from '../../../utils/api';
import {
  commentAction, commentingFailed, commentingSuccess,
  fetchCommentAuthorsAction,
  updateCommentAction,
} from './actions';
import { FETCHING_COMMENT_AUTHORS, UPDATING_COMMENT } from './types';

const store = mockStore({});
const { slug } = article;
const successCallback = jest.fn();

describe('Comment Editor actions', () => {
  afterEach(() => {
    axiosMock.reset();
    store.clearActions();
  });

  it('should fetch article authors', () => {
    axiosMock.onGet(getURL(`articles/${slug}/comments/authors`))
      .reply(200, { data: { users: [] } });
    store.dispatch(fetchCommentAuthorsAction(slug))
      .then(() => {
        expect(store.getActions()).toContainEqual({ type: FETCHING_COMMENT_AUTHORS });
      });
  });

  it('should update a comment', () => {
    axiosMock.onPut(getURL(`articles/${slug}/comments/${comment.id}`))
      .reply(200, { data: { comment } });
    store.dispatch(updateCommentAction(slug, comment.body, comment.id, [], successCallback))
      .then(() => {
        expect(store.getActions()).toContainEqual({ type: UPDATING_COMMENT });
      }).catch(() => {});
  });

  it('should show error on failure to update comment', () => {
    axiosMock.onPut(getURL(`articles/${slug}/comments/${comment.id}`))
      .reply(403, { response: { error: "Error updating comment" } });
    store.dispatch(updateCommentAction(slug, comment.body, comment.id, [], successCallback))
      .catch(() => {
        expect(store.getActions()).toContainEqual({ type: UPDATING_COMMENT });
      });
  });

  it('should post a comment on correct information', () => {
    axiosMock.onPost(getURL(`articles/${slug}/comments`))
      .reply(201, { data: { comment } });
    store.dispatch(commentAction(slug, comment.body, null, [], successCallback))
      .then(() => {
        expect(store.getActions()).toContainEqual(commentingSuccess(comment));
      });
  });

  it('should fail on posting a wrong comment', () => {
    axiosMock.onPost(getURL(`articles/${slug}/comments/${comment.id}`))
      .reply(403, { data: { error: "Unauthorized" } });
    store.dispatch(commentAction(slug, comment.body, null, [], successCallback))
      .catch(() => {
        expect(store.getActions()).toContainEqual(commentingFailed({ error: "Unauthorized" }));
      });
  });
});
