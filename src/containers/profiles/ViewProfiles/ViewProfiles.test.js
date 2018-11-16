import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import ViewProfile from './index';

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
  user,
  getUserProfile: jest.fn(),
  editUserProfile: jest.fn(),

};

const history = createMemoryHistory(`profiles/view/${user.username}`);

const wrapper = mount(<ViewProfile {...props} store={store} history={history} />);

describe('View Profile container', () => {
  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
