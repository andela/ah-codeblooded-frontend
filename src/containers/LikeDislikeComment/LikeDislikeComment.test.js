import React from 'react';
import { mount } from 'enzyme';
import { LikeDislikeComments } from './index';

describe('likeDislikeComment component', () => {
  const props = {
    reactions: {
      likes: {
        count: 1,
        me: true,
      },
      dislikes: {
        count: 0,
        me: false,
      },
    },
    fetchComment: jest.fn(),
    likeComment: jest.fn(),
    dislikeComment: jest.fn(),
    slug: 'this-is-an-articles-title-plg70mtk521b',
    id: 1,
  };

  let wrapper;
  let likeButton;
  let dislikeButton;

  beforeEach(() => {
    wrapper = mount(<LikeDislikeComments {...props} />);
    likeButton = wrapper.find('#like_comment');
    dislikeButton = wrapper.find('#dislike_comment');
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should handle like', () => {
    likeButton.simulate("click");
    expect(props.likeComment).toHaveBeenCalledTimes(1);
    expect(props.likeComment).toHaveBeenNthCalledWith(1, props.slug, props.id);
    expect(props.fetchComment).toHaveBeenNthCalledWith(2, props.slug, props.id);
  });

  it('should handle dislike', () => {
    dislikeButton.simulate("click");
    expect(props.dislikeComment).toHaveBeenCalledTimes(1);
    expect(props.dislikeComment).toHaveBeenNthCalledWith(1, props.slug, props.id);
    expect(props.fetchComment).toHaveBeenNthCalledWith(2, props.slug, props.id);
  });
});
