import React from 'react';
import { shallow } from 'enzyme';
import Modal from './index';

describe('<Modal />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper.length).toEqual(1);
  });
});
