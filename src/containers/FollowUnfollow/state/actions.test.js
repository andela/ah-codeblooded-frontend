import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  FETCH_FOLLOWERS_FAILURE,
  FETCH_FOLLOWERS_SUCCESS,
  FOLLOW_USER_FAILURE,
  FOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
} from './type';
import {
  fetchAction,
  unfollowAction,
  followAction,
  followSuccess,
  followFailure,
  checkFollowers,
  checkFollowingFailure,
} from './actions';
import api, { getURL } from '../../../utils/api';
import { PAGE_LOADING, PAGE_LOADED } from "../../NavBar/state/types";
import { FETCHING_USERS_SUCCESS } from "../../UsersListing/state/type";
import { fetchUsersSuccess } from "../../UsersListing/state/actions";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

const listName = "followers";
const username = "brian";

const payload = "success";
const error = "failure";

const resData = {
  following_status: true,
};
const data = {
};

describe('user listing actions', () => {
  const mock = new MockAdapter(api);
  const checkFollowUrl = getURL(`profiles/following/${username}`);
  const followUrl = getURL(`profiles/${username}/follow/`);

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
    mock.reset();
  });

  it('should dispatch PAGE_LOADING ', () => {
    mock.onGet(checkFollowUrl, username).reply(200, resData);
    return store.dispatch(fetchAction(username)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: PAGE_LOADING,
      });
    });
  });

  it('should dispatch checkFollowingFailure ', () => {
    mock.onGet(checkFollowUrl, username).reply(400, {});
    return store.dispatch(fetchAction(username)).catch(() => {
      expect(store.getActions()[0]).toEqual({
        type: FETCH_FOLLOWERS_FAILURE,
      });
    });
  });

  it('should dispatch followSuccess ', () => {
    mock.onPost(followUrl, username).reply(200, data);
    return store.dispatch(followAction(username)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: PAGE_LOADING,
      });
    });
  });

  it('should dispatch followFailure ', () => {
    mock.onPost(checkFollowUrl, username).reply(400, resData);
    return store.dispatch(followAction(username)).catch(() => {
      expect(store.getActions()[0]).toEqual({
        type: FOLLOW_USER_FAILURE,
      });
    });
  });

  it('should dispatch unfollowSuccess ', () => {
    mock.onPost(checkFollowUrl, username).reply(200, resData);
    return store.dispatch(unfollowAction(username)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: PAGE_LOADED,
      });
    });
  });

  it('should dispatch unfollowFailure ', () => {
    mock.onPost(checkFollowUrl, username).reply(400, resData);
    return store.dispatch(unfollowAction(username)).catch(() => {
      expect(store.getActions()[0]).toEqual({
        type: UNFOLLOW_USER_FAILURE,
      });
    });
  });

  it('should create an action to dispatch follow success to the user', () => {
    const expectedAction = {
      type: FOLLOW_USER_SUCCESS,
      payload: "success",
    };
    expect(followSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action to dispatch errors to the user', () => {
    const expectedAction = {
      type: FOLLOW_USER_FAILURE,
      error: "failure",
    };
    expect(followFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to dispatch check followers', () => {
    const expectedAction = {
      type: FETCH_FOLLOWERS_SUCCESS,
      payload: "success",
    };
    expect(checkFollowers(payload)).toEqual(expectedAction);
  });

  it('should create an action to dispatch check followers failure', () => {
    const expectedAction = {
      type: FETCH_FOLLOWERS_FAILURE,
      error: "failure",
    };
    expect(checkFollowingFailure(error)).toEqual(expectedAction);
  });

  it('should create an action to dispatch check followers success', () => {
    const expectedAction = {
      type: FETCH_FOLLOWERS_SUCCESS,
      payload: "success",
    };
    expect(checkFollowers(payload)).toEqual(expectedAction);
  });

  it('should create an action to dispatch fetchingUsers success to the user', () => {
    const expectedAction = {
      type: FETCHING_USERS_SUCCESS,
      payload: { data: "success", listName: "followers" },
    };
    expect(fetchUsersSuccess(payload, listName)).toEqual(expectedAction);
  });
});
