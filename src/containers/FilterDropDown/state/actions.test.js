import * as actions from './actions';
import { mockStore, axiosMock } from '../../../utils/testHelpers';
import { getURL } from '../../../utils/api';

const payload = {
  author: {
    username: 'testuser',
    bio: 'This is a bio',
    image:
      'https://t3.ftcdn.net/jpg/01/83/55/76/500_F_183557656_DRcvOesmfDl5BIyhPKrcWANFKy2964i9.jpg',
  },
  tags: {
    tag: 'tag',
  },
};

const store = mockStore({});

describe('Filter dropdown actions', () => {
  it('should get the authors of articles', () => {
    axiosMock.onGet(getURL('users/search/')).reply(200, payload);
    store.dispatch(actions.fetchAuthorsAction('testuser')).then(() => {
      expect(store.getActions()).toContainEqual({ type: actions.FETCH_AUTHORS, payload });
    });
  });

  it('should get tags of articles', () => {
    axiosMock.onGet(getURL('tags/')).reply(200, payload);
    store.dispatch(actions.fetchTagsAction('tag')).then(() => {
      expect(store.getActions()).toContainEqual({ type: actions.FETCH_TAGS, payload });
    });
  });
});
