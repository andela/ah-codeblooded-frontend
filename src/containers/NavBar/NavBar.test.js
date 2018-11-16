import configureMockStore from 'redux-mock-store';
import React from 'react';
import { mount } from 'enzyme';
import NavBar from './index';
import PreLoader from '../../components/PreLoader';
import { user } from '../LoginForm/state/mock';

const mockStore = configureMockStore();

window.location.reload = jest.fn();
window.setTimeout = jest.fn();
const store = mockStore({
  pageProgress: {
    isPageLoading: false,
  },
});

const wrapper = mount(<NavBar store={store} />);

const checkProgress = (loading) => {
  wrapper.setProps({ isPageLoading: loading });
  expect(wrapper.find(PreLoader).length).toEqual(1);
};

describe('The page navigation bar component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should display a progress if the page is loading', () => {
    checkProgress(true);
  });

  it('should not display a progress if the page is not loading', () => {
    checkProgress(false);
    expect(window.setTimeout).toHaveBeenCalled();
  });

  it('should render the profile dropdown if a user is authenticated', () => {
    wrapper.setProps({ user: { ...user } });
    expect(wrapper.find("#profile-dropdown").length).toEqual(2);
  });

  it('should logout a user', () => {
    wrapper.setProps({ user: { ...user } });
    wrapper.find(".dropdown-item").last().simulate('click');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
