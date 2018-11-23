import { shallow } from 'enzyme';
import React from 'react';
import HomePage from './index';
import { user } from '../../utils/testHelpers';
import layouts from '../../components/ArticleCard/layouts';

describe('<HomePage /> component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<HomePage history={{ push: () => '' }} user={user} />);
  });

  it('should render <HomePage /> component successfully', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should provide the correct layout for the listings', () => {
    const instance = wrapper.instance();
    for (let i = 0; i < 10; i += 1) {
      expect(instance.feedLayout(i)).toEqual(layouts.HORIZONTAL_LAYOUT);
    }
    expect(instance.trendingLayout()).toEqual(layouts.MINIMAL_AUTHOR_LAYOUT);
    expect(instance.featuredLayout(0)).toEqual(layouts.VERTICAL_LAYOUT);
  });
});
