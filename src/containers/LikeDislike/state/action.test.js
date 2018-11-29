import MockAdapter from 'axios-mock-adapter';
import mockStore from '../../../utils/redux_mock_store';
import api, { getURL } from '../../../utils/api';
import { fetchReactions, likeArticle, dislikeArticle } from './actions';
import {
  FETCH_REACTIONS_SUCCESS,
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  UNDISLIKE_ARTICLE,
  UNLIKE_ARTICLE,
  LIKE_DISLIKE_ERROR,
} from './types';

describe('the like and dislike actions', () => {
  const mock = new MockAdapter(api);
  let likeData;
  let dislikeData;
  let unlikeData;
  let undislikeData;
  let store;
  const slug = 'i-want-to-share-this-articles';
  const url = `articles/${slug}`;
  const liked = false;
  const disliked = false;
  const unlike = true;
  const undislike = true;

  const likeAction = payload => ({ type: LIKE_ARTICLE, payload });
  const unlikeAction = payload => ({ type: UNLIKE_ARTICLE, payload });
  const dislikeAction = payload => ({ type: DISLIKE_ARTICLE, payload });
  const undislikeAction = payload => ({ type: UNDISLIKE_ARTICLE, payload });


  beforeEach(() => {
    store = mockStore();
    likeData = {
      dislikes: {
        count: 0,
        me: false,
      },
      likes: {
        count: 1,
        me: true,
      },
    };
    dislikeData = {
      dislikes: {
        count: 1,
        me: true,
      },
      likes: {
        count: 0,
        me: false,
      },
    };
    undislikeData = {
      dislikes: {
        count: 0,
        me: false,
      },
      likes: {
        count: 0,
        me: false,
      },
    };
    unlikeData = {
      dislikes: {
        count: 0,
        me: false,
      },
      likes: {
        count: 0,
        me: false,
      },
    };
  });

  afterEach(() => {
    mock.reset();
    store.clearActions();
  });

  it('should dispatch FETCH_REACTION', () => {
    mock.onGet(getURL(`${url}/reactions/`)).reply(200, {
      reactions: {
        dislikes: {
          count: 0,
          me: false,
        },
        likes: {
          count: 1,
          me: true,
        },
      },
    });

    return store.dispatch(fetchReactions(slug)).then((data) => {
      expect(store.getActions()).toContainEqual(
        {
          type: FETCH_REACTIONS_SUCCESS,
          payload: data,
        },
      );
    }).catch(() => {

    });
  });

  it('should dispatch LIKE_ARTICLE', () => {
    mock.onPost(`${url}/like/`).reply(201, likeData);
    return store.dispatch(likeArticle(slug, liked)).then((data) => {
      expect(store.getActions()).toContainEqual(likeAction(data));
    });
  });

  it('should dispatch DISLIKE_ARTICLE', () => {
    mock.onPost(`${url}/dislike/`).reply(201, dislikeData);
    return store.dispatch(dislikeArticle(slug, disliked)).then((data) => {
      expect(store.getActions()).toContainEqual(dislikeAction(data));
    });
  });

  it('should dispatch UNLIKE_ARTICLE', () => {
    mock.onDelete(`${url}/like/`).reply(200, unlikeData);
    return store.dispatch(likeArticle(slug, unlike)).then((data) => {
      expect(store.getActions()).toContainEqual(unlikeAction(data));
    });
  });

  it('should dispatch UNDISLIKE_ARTICLE', () => {
    mock.onDelete(`${url}/dislike/`).reply(200, undislikeData);
    return store.dispatch(dislikeArticle(slug, undislike)).then((data) => {
      expect(store.getActions()).toContainEqual(undislikeAction(data));
    });
  });

  it('should dispatch LIKE_DISLIKE_ERROR on undislike action', () => {
    mock.onDelete(`${url}/dislike/`).reply(200, dislikeData);
    return store.dispatch(dislikeArticle(slug, disliked)).then(() => {
    }).catch((error) => {
      expect(store.getActions()).toContainEqual({
        type: LIKE_DISLIKE_ERROR,
        payload: error,
      });
    });
  });

  it('should dispatch LIKE_DISLIKE_ERROR on like action', () => {
    mock.onPost(`${url}/likes/`).reply(201, likeData);
    return store.dispatch(likeArticle(slug)).then(() => {
    }).catch((error) => {
      expect(store.getActions()).toContainEqual({
        type: LIKE_DISLIKE_ERROR,
        payload: error,
      });
    });
  });

  it('should dispatch LIKE_DISLIKE_ERROR when fetching data', () => {
    mock.onGet(getURL(`${url}/reactions/`)).reply(200);

    return store.dispatch(fetchReactions(slug)).then(() => {
    }).catch((error) => {
      expect(store.getActions()).toContainEqual(
        {
          type: LIKE_DISLIKE_ERROR,
          payload: error,
        },
      );
    });
  });
});
