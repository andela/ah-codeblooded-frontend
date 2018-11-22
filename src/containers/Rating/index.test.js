import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { Rating } from './index';

const mockstore = configureStore();
const store = mockstore({});

const props = {
  rate: {
    state: 'You have rated this article',
  },
  currentRate: jest.fn(),
  rateArticle: jest.fn(),
  slug: 'fdfdf',
};

const rate = jest.fn();

const wrapper = shallow(<Rating {...props} store={store} />);
const instance = wrapper.instance();

describe('<Rating/>', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('renders the <Rating /> component', () => {
    expect(wrapper.length).toEqual(1);
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should add rating when starcomponent is clicked', () => {
    instance.onStarClick(0);
    expect(rate.mock.calls.length).toEqual(0);
  });

  it('author cannot rate their own article', () => {
    wrapper.setProps({ rate: { state: 'You cannot rate your own article.' } });
  });
});
