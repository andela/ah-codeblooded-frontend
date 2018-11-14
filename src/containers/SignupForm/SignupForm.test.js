import React from 'react';
import { mount } from 'enzyme';
import { SignForm } from './index';

describe('The SignupForm', () => {
  let wrapper;
  const props = {
    registerUser: jest.fn(),
    success: false,
    isRegistering: true,
  };

  beforeEach(() => {
    wrapper = mount(<SignForm {...props} />);
  });

  it('should update state when data is keyed in', () => {
    wrapper.find('input[name="email"]').simulate('change', {
      target: { name: 'email', value: 'chomba@mail.com' },
    });
    wrapper.find('input[name="username"]').simulate('change', {
      target: { name: 'username', value: 'chomba' },
    });
    wrapper.find('input[name="password"]').simulate('change', {
      target: { name: 'password', value: 'ChoMb@3' },
    });
    wrapper.find('input[name="confirmPassword"]').simulate('change', {
      target: { name: 'confirmPassword', value: 'ChoMb@3' },
    });
    expect(wrapper.state()).toMatchObject({
      email: 'chomba@mail.com',
      username: 'chomba',
      password: 'ChoMb@3',
      confirmPassword: 'ChoMb@3',
    });
  });

  it('should trigger registerUser when submit is triggered', () => {
    const Props = {
      registerUser: jest.fn(),
      success: true,
      isRegistering: false,
    };

    wrapper = mount(<SignForm {...Props} />);
    wrapper.find('input[name="email"]').simulate('change', {
      target: { name: 'email', value: 'chomba@mail.com' },
    });
    wrapper.find('input[name="username"]').simulate('change', {
      target: { name: 'username', value: 'chomba' },
    });
    wrapper.find('input[name="password"]').simulate('change', {
      target: { name: 'password', value: 'ChoMb@3' },
    });
    wrapper.find('input[name="confirmPassword"]').simulate('change', {
      target: { name: 'confirmPassword', value: 'ChoMb@3' },
    });
    wrapper.find('form').simulate('submit');
    expect(Props.registerUser).toHaveBeenCalledTimes(1);
    expect(Props.registerUser).toHaveBeenNthCalledWith(1, {
      user: {
        errors: {},
        email: 'chomba@mail.com',
        username: 'chomba',
        password: 'ChoMb@3',
        confirmPassword: 'ChoMb@3',
      },

    });
  });
});
