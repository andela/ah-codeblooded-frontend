import React from 'react';
import { shallow } from 'enzyme';
import LoginPage from './index';

describe('<LoginPage />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper.length).toEqual(1);
  });
});
