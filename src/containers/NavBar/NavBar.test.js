import configureMockStore from 'redux-mock-store';
import React from 'react';
import { mount } from 'enzyme';
import NavBar from './index';
import PreLoader from '../../components/PreLoader';

const mockStore = configureMockStore();

const store = mockStore({
  pageProgress: {
    isPageLoading: false,
  },
});

const wrapper = mount(<NavBar store={store} />);

const checkProgress = (loading) => {
  wrapper.setProps({ isPageLoading: loading });
  expect(wrapper.find(PreLoader).length).toEqual(loading ? 1 : 0);
};

describe('The page navigation bar component', () => {
  it('should display a progress if the page is loading', () => {
    checkProgress(true);
  });

  it('should not display a progress if the page is not loading', () => {
    checkProgress(false);
  });
});
