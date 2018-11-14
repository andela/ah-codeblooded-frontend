import React from 'react';
import { shallow } from 'enzyme';
import SignUpPage from './index';

describe('<SignUpPage /> component', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<SignUpPage />);
    expect(wrapper.length).toEqual(1);
    const render = shallow(<signup />);
    expect(render.length).toEqual(1);
  });
});
