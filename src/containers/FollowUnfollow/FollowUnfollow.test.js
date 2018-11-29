import React from 'react';
import { mount, shallow } from 'enzyme';
import { FollowUnfollow } from './index';

describe('Follow/unfollow user container', () => {
  const props = {
    username: "mr_bar",
    fetch: jest.fn(),
    follow: jest.fn(),
    unfollow: jest.fn(),
    users: {
      following: {
        users: [
          { username: 'ms_jane' }, { username: 'mr_doe' },
        ],
      },
    },
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = mount(<FollowUnfollow {...props} />);
  });

  it('should render without crashing', () => {
    expect(() => shallow(<FollowUnfollow {...props} />)).not.toThrow();
  });

  it("call unhandle follow", () => {
    wrapper.find(".green").simulate('click');
    expect(props.follow).toHaveBeenCalledTimes(1);
    expect(props.follow).toHaveBeenNthCalledWith(1, props.username);
  });

  it("call handle unfollow", () => {
    wrapper.setProps({ username: "mr_doe" });
    wrapper.find(".red").simulate('click');
    expect(props.unfollow).toHaveBeenCalledTimes(1);
    expect(props.unfollow).toHaveBeenNthCalledWith(1, "mr_doe");
  });
});
