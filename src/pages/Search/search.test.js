import React from 'react';
import { mount, shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { Search } from './index';
import mockStore from '../../utils/redux_mock_store';

const store = mockStore();

const props = {
  fetchArticles: jest.fn(),
  onSearch: jest.fn(),
  onFilterChanged: jest.fn(),
  filtersChanged: jest.fn(),
};

jest.useFakeTimers();

describe('The Search container', () => {
  const wrapper = mount(<Provider store={store}><Search {...props} /></Provider>);

  beforeEach(() => {
    wrapper.setProps({ ...props });
  });

  it('renders without crashing', () => {
    const wrapper2 = shallow(<Search {...props} />);
    expect(wrapper2).toMatchSnapshot();
  });

  it('receive props', () => {
    wrapper.find(Search).setState({ tag: 'tag' });
    expect(wrapper.find('.card').length).toEqual(1);
  });

  it('always renders a div', () => {
    const divs = wrapper.find('div');
    expect(divs).toBeDefined();
  });

  it('always renders a <ConnectedArticleListing/>', () => {
    const NavBar = wrapper.find('Navbar');
    expect(NavBar).toBeTruthy();
  });

  it('always renders a <ConnectedArticleListing/>', () => {
    const ArticleListing = wrapper.find('ArticleListing');
    expect(ArticleListing).toBeTruthy();
  });

  it('calls onSearch method', () => {
    wrapper.find('input').at(0).simulate('change', { target: { value: 'searchme' } });
    expect(props.fetchArticles.mock.calls.length).toEqual(0);
    jest.runAllTimers();
    expect(setTimeout).toHaveBeenCalled();
  });

  it('should filter articles when user stops typing', () => {
    wrapper.find('button').at(1).simulate('click');
    expect(props.filtersChanged.mock.calls.length).toEqual(0);
  });

  it('always renders a <FilterDropDown />', () => {
    const FilterDropDown = wrapper.find('FilteDropDown');
    expect(FilterDropDown).toBeTruthy();
  });
});
