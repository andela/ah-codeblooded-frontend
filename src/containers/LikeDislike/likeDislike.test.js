import React from 'react';
import { shallow, mount } from 'enzyme';
import mockStore from '../../utils/redux_mock_store';
import { initialState } from './state/reducer';

import LikeDislike from './index';

const shallowWithStore = (component, store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};

const mountWithStore = (component, store) => {
  const context = {
    store,
  };
  return mount(component, { context });
};

describe('like/dislike container', () => {
  let store;
  let wrapper;

  const props = {
    likes: {
      count: 1,
      me: true,
    },
    dislikes: {
      count: 0,
      me: false,
    },
    isFetching: true,
    slug: 'i-want-to-share-this-articles',
    likeArticle: jest.fn(),
    dislikeArticle: jest.fn(),
    fetchReactions: jest.fn(),
  };

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mountWithStore(<LikeDislike {...props} />, store);
  });

  it('renders without crashing', () => {
    shallowWithStore(<LikeDislike />, store);
  });

  it('renders the div valign-wrapper', () => {
    expect(wrapper.find('.col l8 s12 row valign-wrapper')).toBeDefined();
  });

  it('renders the renders the span like count', () => {
    const text = wrapper.find('span').first().text();
    expect(text).toEqual('1');
  });

  it('renders the renders the span dislike count', () => {
    const text = wrapper.find('span').last().text();
    expect(text).toEqual('0');
  });

  it('renders the renders the thumbs up icon', () => {
    const text = wrapper.find('i').first().text();
    expect(text).toEqual('thumb_up');
  });

  it('renders the renders the thumbs down icon', () => {
    const text = wrapper.find('i').last().text();
    expect(text).toEqual('thumb_down');
  });

  it('calls the handleLike function', () => {
    const button = wrapper.find('button').first().simulate('click');
    expect(button.length).toBe(1);
  });

  it('calls the handleDisLike function', () => {
    const button = wrapper.find('button').at(1).simulate('click');
    expect(button.length).toBe(1);
  });
});
