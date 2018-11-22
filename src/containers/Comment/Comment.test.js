import React from 'react';
import { mount } from 'enzyme';
import {
  article, comment, mockStore, user,
} from '../../utils/testHelpers';
import { Comment } from './index';
import { initialState } from '../CommentEditor/state/reducer';
import { commentsInitialState } from '../CommentThread/state/reducer';
import { CommentEditor } from '../CommentEditor/index';

export const commentStore = mockStore({
  commenting: initialState,
  comments: {
    ...commentsInitialState,
    threads: {
      8: {
        ...commentsInitialState,
      },
    },
  },
});

const props = {
  deleteComment: jest.fn(),
  toggleComment: jest.fn(),
  slug: article.slug,
  updateComment: jest.fn(),
  cancelListener: jest.fn(),
  comment,
};
const wrapper = mount(<Comment store={commentStore} {...props} user={user} />);

describe("<Comment/> component", () => {
  it('should render the comment', () => {
    wrapper.setProps({ comment });
    expect(wrapper.find(".comment").length).toEqual(1);
  });

  it('should start the <CommentEditor/> when reply is clicked', () => {
    wrapper.find(".reply").simulate('click');
    expect(wrapper.state('commenting')).toBe(true);
  });

  it('should start editing a comment', () => {
    wrapper.find(".context-menu").find("button").first().simulate('click');
    expect(wrapper.state('editing')).toBe(true);
  });

  it('should start deleting a comment', () => {
    wrapper.setState({ editing: false });
    wrapper.find(".context-menu").find(".btn").at(1).simulate('click');
    expect(wrapper.state('toDelete')).toBe(true);
  });

  it('should stop deleting a comment', () => {
    wrapper.setState({ editing: false, toDelete: true });
    wrapper.find(".context-menu").find('.btn').at(1).simulate('click');
    expect(wrapper.state('toDelete')).toBe(false);
  });

  it('should cancel edit on click close', () => {
    wrapper.setState({ editing: true });
    wrapper.find(CommentEditor).find("button").first().simulate('click');
    expect(wrapper.state('editing')).toBe(false);
  });

  it('should cancel edit on click cancel', () => {
    wrapper.setState({ editing: true });
    wrapper.find(CommentEditor).find("button").at(2).simulate('click');
    expect(wrapper.state('editing')).toBe(false);
  });

  it('should open parent reply on click reply', () => {
    wrapper.setProps({ comment: { ...comment, parent: 8 } });
    wrapper.find(".reply").simulate('click');
    expect(props.toggleComment).toHaveBeenCalled();
  });

  it('should delete a comment on click delete', () => {
    wrapper.setState({ toDelete: true });
    wrapper.find(".context-menu").find('.btn').at(0).simulate('click');

    expect(props.deleteComment).toHaveBeenCalled();
  });
});
