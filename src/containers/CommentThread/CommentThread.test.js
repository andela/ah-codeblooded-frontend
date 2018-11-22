import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { article, comment } from '../../utils/testHelpers';
import { CommentThread } from './index';
import { initialState } from './state/reducer';
import { commentStore } from '../Comment/Comment.test';

const store = commentStore;

const props = {
  ...initialState,
  results: [
    comment,
  ],
  links: {
    next: "some link",
  },
  slug: article.slug,
  parentId: comment.parent,
  fetchComments: jest.fn(),
};
const wrapper = mount(
  <Provider store={store}>
    <CommentThread store={store} {...props} />
  </Provider>,
);

describe("<CommentThread> component", () => {
  it('should fetch more comments', () => {
    wrapper.find(".fetchMore").simulate('click');

    expect(props.fetchComments).toHaveBeenCalled();
  });
});
