import React from 'react';
import { shallow } from 'enzyme';
import ArticleCardLoader from './index';
import layouts from '../ArticleCard/layouts';

describe('<ArticleCardLoader/> component', () => {
  it('renders an loader with a particular layout', () => {
    const wrapper = shallow(<ArticleCardLoader layout={layouts.VERTICAL_LAYOUT} />);
    expect(wrapper).toMatchSnapshot();
  });
});
