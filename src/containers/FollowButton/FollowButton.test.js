import React from 'react';
import { mount } from 'enzyme';
import { FollowButton } from './index';

describe('FollowUnFollow user container', () => {
  const props = {
    username: "mr_foo",
    fetch: jest.fn(),
    follow: jest.fn(),
    unfollow: jest.fn(),
    following: false,
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(<FollowButton {...props} />);
  });

  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should call fetch when component mounts', () => {
    expect(props.fetch).toHaveBeenCalledTimes(1);
    expect(props.fetch).toHaveBeenNthCalledWith(1, props.username);
  });

  it("should call unfollow when unfollow button is clicked", () => {
    wrapper.setProps({ following: true });
    wrapper.find(".red").simulate('click');
    expect(props.unfollow).toHaveBeenCalledTimes(1);
    expect(props.unfollow).toHaveBeenNthCalledWith(1, props.username);
  });

  it("should call follow when follow button is clicked", () => {
    wrapper.find(".green").simulate('click');
    expect(props.follow).toHaveBeenCalledTimes(1);
    expect(props.follow).toHaveBeenNthCalledWith(1, props.username);
  });
});
