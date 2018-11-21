import { shallow } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import { RatingStats } from './index';

const mockstore = configureStore();
const store = mockstore({});
const props = {
  rating: {
    avg_rating: 0,
    total_user: 0,
    each_rating: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  },
  fetchRatings: jest.fn(),
  slug: 'this-is-a-slug',
};

const totalRating = jest.fn();

const wrapper = shallow(<RatingStats {...props} store={store} totalRating={totalRating} />);

describe('<Rating/>', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('renders the <RatingStats /> component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('author cannot rate their own article', () => {
    wrapper.setProps({ rate: { state: 'You cannot rate your own article.' } });
  });
});
