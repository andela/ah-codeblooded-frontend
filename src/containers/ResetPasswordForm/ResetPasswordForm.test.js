import React from 'react';
import { shallow, mount } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import { ResetPasswordForm } from '.';

describe('The ResetPasswordForm container', () => {
  const props = {
    resetPassword: jest.fn(),
    resetFieldError: jest.fn(),
    resetGenericError: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    const options = new ReactRouterEnzymeContext();
    wrapper = mount(<ResetPasswordForm {...props} />, options);
  });

  it('should render without crashing', () => {
    expect(() => shallow(<ResetPasswordForm {...props} />)).not.toThrow();
  });

  it('should render success message', () => {
    wrapper.setProps({ resetSuccessful: true, message: 'Foo bar' });

    expect(wrapper.text()).toContain('Foo bar');
  });

  it('should render login link on success', () => {
    wrapper.setProps({ resetSuccessful: true });

    expect(wrapper.find('Link').html()).toContain('Login');
  });

  it('should render generic error message', () => {
    wrapper.setProps({ errors: { error: 'Foo bar' } });

    expect(wrapper.text()).toContain('Foo bar');
  });

  it('should call resetGenericError when any field comes to focus', () => {
    wrapper.find('[name="email"]').simulate('focus');
    wrapper.find('[name="password"]').simulate('focus');
    wrapper.find('[name="confirmPassword"]').simulate('focus');

    expect(props.resetGenericError).toHaveBeenCalledTimes(3);
  });

  it('should call resetFieldError when any field comes to focus', () => {
    wrapper.find('[name="email"]').simulate('focus');
    wrapper.find('[name="password"]').simulate('focus');
    wrapper.find('[name="confirmPassword"]').simulate('focus');
    expect(props.resetFieldError).toHaveBeenNthCalledWith(1, 'email');
    expect(props.resetFieldError).toHaveBeenNthCalledWith(2, 'password');
    expect(props.resetFieldError).toHaveBeenNthCalledWith(3, 'confirm_password');
  });

  it('should render field error messages', () => {
    wrapper.setProps({ errors: { email: ['Foo', 'Bar'], password: ['Baz'], confirm_password: ['FooBar'] } });
    expect(wrapper.find('span.red-text.helper-text')).toHaveLength(4);
    expect(wrapper.text()).toContain('Foo', 'Bar', 'Baz', 'FooBar');
  });

  it('should disable the reset link button when requesting link', () => {
    wrapper.setProps({ isRequesting: true });
    expect(wrapper.find('button').props().disabled).toBe(true);
  });

  it('should call resetPassword when Reset password button is clicked', () => {
    wrapper.find('[name="email"]').simulate('change', {
      target: { name: 'email', value: 'email@mail.com' },
    });
    wrapper.find('input[name="password"]').simulate('change', {
      target: { name: 'password', value: 'foo' },
    });
    wrapper.find('input[name="confirmPassword"]').simulate('change', {
      target: { name: 'confirmPassword', value: 'foo' },
    });
    wrapper.find('form').simulate('submit');
    expect(props.resetPassword).toHaveBeenNthCalledWith(1, 'email@mail.com', 'foo', 'foo', null);
  });
});
