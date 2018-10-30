import { shallow } from 'enzyme';
import React from 'react';
import HomePage from './index';

describe('<HomePage />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<HomePage history={{ push: () => '' }} />);
  });

  it('should render <HomePage /> component successfully', () => {
    expect(wrapper.length).toEqual(1);
  });
});
