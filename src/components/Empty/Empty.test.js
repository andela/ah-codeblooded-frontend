import React from 'react';
import { shallow } from 'enzyme';
import Empty from './index';

describe('<Empty> component', () => {
  it('should render without crushing', () => {
    const wrapper = shallow(<Empty />);
    expect(wrapper).toMatchSnapshot();
  });
});
