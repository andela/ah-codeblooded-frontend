import React from 'react';
import { mount } from 'enzyme';
import { mockStore, user } from '../../utils/testHelpers';
import { CommentEditor } from './index';
import { initialState } from './state/reducer';

const store = mockStore({});

const props = {
  ...initialState,
  initialValue: "This is a comment",
  comment: jest.fn(),
  fetchAuthors: jest.fn(),
  updateComment: jest.fn(),
  updateListener: jest.fn(),
};
const wrapper = mount(<CommentEditor store={store} {...props} user={user} />);

describe("<CommentEditor> component", () => {
  it('should post a comment on click publish', () => {
    wrapper.setState({ body: "Some comment" });
    wrapper.find("button").first().simulate('click');
    expect(props.comment).toHaveBeenCalled();
  });

  it('should update a comment on click update', () => {
    wrapper.setState({ body: "Some comment" });
    wrapper.setProps({ update: true });
    wrapper.find("button").first().simulate('click');
    expect(props.updateComment).toHaveBeenCalled();
  });

  it('should add mentions on input', () => {
    wrapper.setProps({ authors: [{ username: "gitaumoses4" }] });
    expect(wrapper.state('users')).toContainEqual({ display: "gitaumoses4", id: "gitaumoses4" });
  });

  it('should update state on mentions added', () => {
    wrapper.instance().onInput(null,
      "This is some comment", "This is some comment",
      [{ display: "gitaumoses4" }]);
    expect(wrapper.state('mentions')).toContainEqual("gitaumoses4");
  });
});
