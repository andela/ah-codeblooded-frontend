import React from 'react';
import { mount } from 'enzyme';
import { ActivateAccount } from './index';

window.location.reload = jest.fn();

describe('<ActivateAccount /> component', () => {
  let wrapper;
  const props = {
    isActivating: true,
    activateUser: jest.fn(),
    activationSuccess: false,
    activationFailed: true,
  };

  beforeEach(() => {
    wrapper = mount(<ActivateAccount {...props} />);
  });
  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('displays successful account activation', () => {
    wrapper.setProps({ activationSuccess: true });
    expect(wrapper.find(".green-text").text()).toEqual("Your account has been activated");
  });

  it('reloads page on button click', () => {
    wrapper.find(".try-again").simulate('click');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
