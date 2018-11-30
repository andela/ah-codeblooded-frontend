import * as actions from './actions';
import * as types from './types';
import { mockStore, axiosMock } from '../../../utils/testHelpers';
import { getURL } from '../../../utils/api';

const payload = {
  profile: {
    username: 'testuser',
    bio: 'This is a bio',
    image:
      'https://t3.ftcdn.net/jpg/01/83/55/76/500_F_183557656_DRcvOesmfDl5BIyhPKrcWANFKy2964i9.jpg',
  },
};

const errors = {
  errors: {
    error: ['This is a profiles error'],
  },
};

const store = mockStore({});

describe('user get profile actions', () => {
  it('should create a request action to GET a user\'s profile', () => {
    const expectedAction = {
      type: types.VIEW_USER_PROFILE,
      payload,
    };
    expect(actions.getProfileSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action to dispatch errors to the user', () => {
    const expectedAction = {
      type: types.USER_PROFILE_ERROR,
      errors,
    };
    expect(actions.getProfileFailure(errors)).toEqual(expectedAction);
  });

  it('should create a request action to EDIT a user\'s profile', () => {
    const expectedAction = {
      type: types.EDIT_USER_PROFILE,
      payload,
    };
    expect(actions.editProfileSuccess(payload)).toEqual(expectedAction);
  });

  it('should create an action to dispatch errors if occurs when editing', () => {
    const expectedAction = {
      type: types.EDIT_PROFILE_ERROR,
      errors,
    };
    expect(actions.editProfileFailure(errors)).toEqual(expectedAction);
  });

  it('should get the profile of a user based on the username', () => {
    axiosMock.onGet(getURL('profiles/beverly/')).reply(200, payload);
    store.dispatch(actions.getUserProfileAction('beverly')).then(() => {
      expect(store.getActions()).toContainEqual({ type: actions.VIEW_USER_PROFILE, payload });
    });
  });

  it('should get the profile of a user based on the username', () => {
    axiosMock.onGet(getURL('profiles/beverly/')).reply(200, payload);
    store.dispatch(actions.getUserProfileAction('beverly')).then(() => {
      expect(store.getActions()).toContainEqual({ type: actions.USER_PROFILE_ERROR, payload });
    });
  });

  it('should edit the profile of a user based on the username', () => {
    axiosMock.onPut(getURL('profiles/beverly/')).reply(200, payload);
    store.dispatch(actions.editUserProfileAction('beverly')).then(() => {
      expect(store.getActions()).toContainEqual({ type: actions.EDIT_USER_PROFILE, payload });
    });
  });

  it('should show an error on editing the profile of a user based on the username', () => {
    axiosMock.onPut(getURL('profiles/beverly/')).reply(403, { errors: 'something' });
    store.dispatch(actions.editUserProfileAction('beverly')).then(() => {
      expect(store.getActions()).toContainEqual({ type: actions.EDIT_PROFILE_ERROR, payload });
    });
  });
});
