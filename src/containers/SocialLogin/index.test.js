import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { SocialLogin } from './index';

const mockstore = configureStore();
const store = mockstore({});

const socialLogin = jest.fn();

const wrapper = shallow(<SocialLogin store={store} socialLogin={socialLogin} />);
const instance = wrapper.instance();

describe('<LoginPage/>', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('renders the <Login /> component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should call responseGoogle when GoogleLogin and FacebookLogin button clicked', () => {
    instance.responseGoogle('token');
    instance.responseFacebook('token');

    expect(socialLogin.mock.calls.length).toEqual(2);
  });
});
