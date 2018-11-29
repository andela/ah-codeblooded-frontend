import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  FETCHING_USERS,
  FETCHING_USERS_SUCCESS,
  FETCHING_USERS_FAILURE,
} from './type';
import {
  fetchUsersAction,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchingUsers,
} from './actions';
import api, { getURL } from '../../../utils/api';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

const listName = "followers";
const user = "brybz";
const error = "failure";
const payload = "success";

describe('following actions', () => {
  const mock = new MockAdapter(api);
  const url = getURL(`profiles/${user}/${listName}/`);

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch PAGE_LOADING ', () => {
    mock.onPost(url, user).reply(200);
    return store.dispatch(fetchUsersAction(user, listName)).then(() => {
      expect(store.getActions()[0]).toEqual({
        type: FETCHING_USERS,
        payload: { listName: "followers" },
      });
    });
  });

  it('should create an action to dispatch errors to the user', () => {
    const expectedAction = {
      type: FETCHING_USERS_FAILURE,
      payload: { data: "failure", listName: "followers" },
    };
    expect(fetchUsersFailure(error, listName)).toEqual(expectedAction);
  });

  it('should create an action to dispatch fetchingUsers success to the user', () => {
    const expectedAction = {
      type: FETCHING_USERS_SUCCESS,
      payload: { data: "success", listName: "followers" },
    };
    expect(fetchUsersSuccess(payload, listName)).toEqual(expectedAction);
  });

  it('should create an action to dispatch fetching users to the user', () => {
    const expectedAction = {
      type: FETCHING_USERS,
      payload: { listName: "followers" },
    };
    expect(fetchingUsers(listName)).toEqual(expectedAction);
  });

  it('should create an action to dispatch fetching users to the user', () => {
    const expectedAction = {
      type: FETCHING_USERS,
      payload: { listName: "followers" },
    };
    expect(fetchingUsers(listName)).toEqual(expectedAction);
  });
});
