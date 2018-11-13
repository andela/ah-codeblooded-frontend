import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import React from 'react';
import { mount } from 'enzyme';
import { initialState } from './state/reducer';
import { article } from '../../utils/testHelpers';
import ArticleListing from './index';

const mockStore = configureMockStore([thunk]);

const store = mockStore(initialState);

const props = {
  fetchArticles: jest.fn(),
  isFetching: false,
  articles: {
    results: [
      article,
      { ...article, slug: 'this-is-a-different-slug' },
    ],
  },
};

describe("<ArticleListing> container component", () => {
  const wrapper = mount(<ArticleListing store={store} {...props} />);

  it('should render a list of two articles', () => {
    expect(wrapper.find('.article-card').length).toEqual(2);
  });
});
