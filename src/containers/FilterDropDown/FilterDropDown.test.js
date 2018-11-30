import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import FilterDropDown from '.';

const author = {
  username: 'bevkololi',
  bio: 'This is a bio',
  image: 'image',
};

const tag = {
  tag: 'andela',
};

const props = {
  author,
  tag,
  filtersChanged: jest.fn(),
  onFilter: jest.fn(),
  clearFilters: jest.fn(),
  selectAll: jest.fn(),
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  filterArticles: {
    authors: { ...author },
    tags: { ...tag },
  },
});

const wrapper = mount(<FilterDropDown {...props} store={store} />, { attachTo: document.body });

describe('View Profile container', () => {
  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should ensure users can update their profile image', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(props.onFilter.mock.calls.length).toEqual(0);
  });

  it('should ensure users can update their profile image', () => {
    wrapper.find('button').at(0).simulate('click');
    expect(props.clearFilters.mock.calls.length).toEqual(0);
  });

  it('should select the whole field on focus', () => {
    wrapper.find('input').at(1).simulate('focus');
    expect(props.selectAll.mock.calls.length).toEqual(0);
  });

  it('should receive a list of authors and tags', () => {
    wrapper.setProps({ authors: [author], tags: [tag] });
    expect(wrapper.instance().authorsInstance).toBeUndefined();
  });
});
