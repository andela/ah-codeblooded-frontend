import { shallow } from 'enzyme';
import React from 'react';
import AuthPage from './index';

const props = {
  match: {
    path: '',
  },
};

const wrapper = shallow(<AuthPage {...props} />);

it('renders AuthPage', () => {
  expect(wrapper.find(AuthPage).length).toEqual(0);
});
