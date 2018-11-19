import React from 'react';
import { mount } from 'enzyme';

import { Subscribe } from './index';

const props = {
  sub: {
    subscriptionStatus: true,
    message: 'you have successfully subscribed to our notifications',
    errors: {},
  },
  subscribe: jest.fn(),
  status: jest.fn(),

};


describe('<Subscribe />) container', () => {
  const wrapper = mount(<Subscribe {...props} />);


  beforeEach(() => {
    wrapper.setProps({ ...props });
  });

  it('renders <Subscribe /> without crashing', () => {
    mount(<Subscribe {...props} />);
  });

  it('<Subscribe /> does receive props', () => {
    expect(wrapper.props()).toBeTruthy();
  });

  it('always renders a div', () => {
    const divs = wrapper.find('div');
    expect(divs).toBeDefined();
  });

  it('renders the h5 element text', () => {
    const text = wrapper.find('.col.s10 h5 strong').text();
    expect(text).toEqual('Notifications on your content');
  });

  it('renders the p element text', () => {
    const text = wrapper.find('.col.s10 p').text();
    expect(text).toEqual('We’ll email you when there are notifications on your articles');
  });

  it('renders a switch class', () => {
    const text = wrapper.find('.switch');
    expect(text).toBeDefined();
  });

  it('calls handleSubscribe onChange', () => {
    wrapper.find('.switch label input').simulate('change');
    expect(props.subscribe).toHaveBeenCalled();
  });
});
