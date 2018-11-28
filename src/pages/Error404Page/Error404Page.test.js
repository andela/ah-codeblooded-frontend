import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from './index';

describe('<PageNotFound> component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<PageNotFound errorMessage="Page not found" errorCode={404} />);
    expect(wrapper).toMatchSnapshot();
  });
});
