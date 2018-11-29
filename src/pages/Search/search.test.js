import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { Search } from './index';
import mockStore from '../../utils/redux_mock_store';

const store = mockStore();

const props = {
  fetchArticles: jest.fn(),
};

describe('the search container', () => {
  const wrapper = mount(<Provider store={store}><Search {...props} /></Provider>);

  beforeEach(() => {
    wrapper.setProps({ ...props });
  });

  it('renders without crashing', () => {
    const wrapper2 = shallow(<Search {...props} />);
    expect(wrapper2).toMatchSnapshot();
  });

  it('receive props', () => {
    expect(wrapper.props()).toBeTruthy();
  });

  it('always renders a div', () => {
    const divs = wrapper.find('div');
    expect(divs).toBeDefined();
  });

  it('renders a Navbar component', () => {
    const NavBar = wrapper.find('Navbar');
    expect(NavBar).toBeTruthy();
  });

  it('renders a ConnectedArticleListing component', () => {
    const ArticleListing = wrapper.find('ArticleListing');
    expect(ArticleListing).toBeTruthy();
  });

  it('renders a search icon', () => {
    const icon = wrapper.find('i').text();
    expect(icon).toBe('search');
  });

  it('calls onSearch method', () => {
    wrapper.find('input').simulate('change');
    expect(props.fetchArticles).toHaveBeenCalled();
  });
});
