import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  likeCommentAction,
  dislikeCommentAction,
  fetchCommentStat,
} from './actions';

import api, { getURL } from '../../../utils/api';
import {
  slug,
  id,
  commentData,
  reactions,
} from './mock';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const mock = new MockAdapter(api);
let store;

const likeUrl = getURL(`articles/${slug}/comments/${id}/likes`);
const dislikeUrl = getURL(`articles/${slug}/comments/${id}/dislikes`);
const fetchUrl = getURL(`articles/${slug}/comments/${id}`);

beforeEach(() => {
  store = mockStore({});
});

afterEach(() => {
  store.clearActions();
});

describe("CommentActions", () => {
  it('should dispatch LIKE_COMMENT after liking a comment', () => {
    mock.onPut(likeUrl).reply(200);
    return store.dispatch(likeCommentAction(slug, id)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'LIKE_COMMENT',
      });
    });
  });

  it('should dispatch LIKE_COMMENT_ERROR ', () => {
    mock.onPut(likeUrl).reply(200);
    return store.dispatch(likeCommentAction()).then(() => {
      expect(store.getActions()[0]).toEqual({
        payload: "Something went wrong. Try again",
        type: "LIKE_COMMENT_ERROR",
      });
    });
  });

  it('should dispatch DISLIKE_COMMENT after disliking a comment', () => {
    mock.onPut(dislikeUrl).reply(200);
    return store.dispatch(dislikeCommentAction(slug, id)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: 'DISLIKE_COMMENT',
      });
    });
  });

  it('should dispatch DISLIKE_COMMENT_ERROR ', () => {
    mock.onPut(dislikeUrl).reply(200);
    return store.dispatch(dislikeCommentAction()).then(() => {
      expect(store.getActions()[0]).toEqual({
        payload: "Something went wrong. Try again",
        type: "DISLIKE_COMMENT_ERROR",
      });
    });
  });
});

describe("fetchCommentStat", () => {
  it('should dispatch FETCH_COMMENT_SUCCESS after fetching comments', () => {
    mock.onGet(fetchUrl).reply(200, commentData);
    return store.dispatch(fetchCommentStat(slug, id)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: 'FETCH_COMMENT_SUCCESS',
        payload: {
          id: 1,
          payload: reactions,
        },
      });
    });
  });

  it('should dispatch FETCH_COMMENT_ERROR ', () => {
    mock.onGet(fetchUrl).reply(404);
    return store.dispatch(fetchCommentStat()).then(() => {
      expect(store.getActions()[0]).toEqual({
        payload: "Something went wrong. Try again",
        type: "FETCH_COMMENT_ERROR",
      });
    });
  });
});
