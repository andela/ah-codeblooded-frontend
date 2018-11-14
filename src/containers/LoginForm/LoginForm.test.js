import { mount } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { LoginForm } from '.';

describe('The LoginForm', () => {
  const initialState = {
    data: {},
    errors: [],
    success: false,
    isLogingIn: false,
  };
  const mockStore = configureStore();
  let wrapper;
  let store;

  const props = {
    loginAction: jest.fn(),
  };

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<LoginForm {...props} store={store} history={{ push: () => '' }} />);
  });

  it('should render successfully', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should update state on input', () => {
    wrapper.find('input[name="email"]').simulate('change', {
      target: { name: 'email', value: 'mail@mailer.com' },
    });
    expect(wrapper.state('email')).toBe('mail@mailer.com');

    wrapper.find('input[name="password"]').simulate('change', {
      target: { name: 'password', value: 'PassW@rd' },
    });
    expect(wrapper.state('password')).toBe('PassW@rd');
  });


  it('should trigger loginAction', () => {
    wrapper.find('input[name="email"]').simulate('change', { target: { name: 'email', value: 'mail@mailer.com' } });
    wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: 'PassW@rd' } });
    wrapper.find('form').simulate('submit');
    expect(props.loginAction).toHaveBeenCalledTimes(1);
  });
});
