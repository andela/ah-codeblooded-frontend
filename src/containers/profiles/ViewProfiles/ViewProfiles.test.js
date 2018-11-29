import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { ViewProfiles } from './index';

const user = {
  username: 'bevkololi',
  image: '',
  bio: 'This is some bio',
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  userProfiles: {
    profile: { ...user },
  },
  pageProgress: {
    isPageLoading: false,
  },
});

const props = {
  getCurrentUser: jest.fn(),
  getUserProfile: jest.fn(),
  editUserProfile: jest.fn(),
  profile: {
    image: 'foobar',
  },

};

const history = createMemoryHistory(`profiles/view/${user.username}`);
const wrapper = shallow(<ViewProfiles {...props} store={store} history={history} user={user} />);


describe('View Profile container', () => {
  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
