import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import ProfilesPage from './index';

const mockStore = configureMockStore();
const store = mockStore({});

describe('<ProfilesPage />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ProfilesPage store={store} />);
    expect(wrapper.length).toEqual(1);
  });
});
