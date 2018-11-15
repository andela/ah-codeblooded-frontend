import React from 'react';
import { shallow, mount } from 'enzyme';
import { ForgotPasswordForm } from '.';


describe('The ForgotPasswordForm container', () => {
  const props = {
    forgotPassword: jest.fn(),
    resendLink: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ForgotPasswordForm {...props} />);
  });

  it('should render without crashing', () => {
    expect(() => shallow(<ForgotPasswordForm {...props} />)).not.toThrow();
  });

  it('should display the passed error message', () => {
    wrapper.setProps({ error: 'My error message' });
    expect(wrapper.find('form').text()).toContain('My error message');
  });

  it('should hide error message when input comes to focus', () => {
    wrapper.setProps({ error: 'My error message' });
    const form = wrapper.find('form');
    expect(form.text()).toContain('My error message');
    wrapper.find('input').simulate('focus');
    expect(form.text()).not.toContain('My error message');
  });

  it('should disable the send link button when requesting link', () => {
    wrapper.setProps({ isRequesting: true });
    expect(wrapper.find('button').props().disabled).toBe(true);
  });

  it('should display message on success', () => {
    wrapper.setProps({ linkSent: true, message: 'We have sent you a link.' });
    expect(wrapper.text()).toContain('We have sent you a link.');
  });

  it('should display re-send link button on success', () => {
    wrapper.setProps({ linkSent: true });
    expect(wrapper.find('button').text()).toEqual('Resend Link');
  });

  it('should trigger forgotPassword when send link button is clicked', () => {
    wrapper.find('input').simulate('change', { target: { value: 'email@mail.com' } });
    wrapper.find('form').simulate('submit');
    expect(props.forgotPassword).toHaveBeenNthCalledWith(1, 'email@mail.com');
  });

  it('should trigger resendLink when re-send link button is clicked', () => {
    wrapper.setProps({ linkSent: true });
    wrapper.find('button').simulate('click');
    expect(props.resendLink).toHaveBeenCalledTimes(1);
  });
});
