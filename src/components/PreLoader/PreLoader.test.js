import React from 'react';
import { shallow } from 'enzyme';
import PreLoader from './index';

describe('<PreLoader/> component', () => {
  it('renders a horizontal progress bar', () => {
    const wrapper = shallow(<PreLoader horizontal />);
    expect(wrapper.find('.progress').length).toEqual(1);
  });

  it('renders a circlular progress bar', () => {
    const wrapper = shallow(<PreLoader />);
    expect(wrapper.find('.preloader-wrapper').length).toEqual(1);
  });
});
