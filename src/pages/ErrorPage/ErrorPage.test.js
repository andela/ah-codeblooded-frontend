import React from 'react';
import { shallow } from 'enzyme';
import { ErrorPage } from './index';

describe('<ErrorPage> component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ErrorPage errorMessage="Page not found" errorCode={404} />);
    expect(wrapper).toMatchSnapshot();
  });
});
