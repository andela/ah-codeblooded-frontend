import React from 'react';
import { shallow } from 'enzyme';
import SignUpPage from './index';

describe('<SignUpPage />', () => {
  it('renders without crashing', () => {
    expect(shallow(<SignUpPage />).length).toEqual(1);
  });
});
