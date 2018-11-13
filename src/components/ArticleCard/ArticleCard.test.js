import React from 'react';
import { shallow } from 'enzyme';
import ArticleCard from './index';
import { article } from '../../utils/testHelpers';
import layouts from './layouts';

const assertLayout = (wrapper, layout, classes) => {
  wrapper.setProps({ layout });
  expect(wrapper.find(classes).length).toEqual(1);
};
describe("<ArticleCard/> component", () => {
  const wrapper = shallow(<ArticleCard article={article} />);


  it('should render a horizontal layout article card', () => {
    expect(wrapper.find('.horizontal').length).toEqual(1);
  });

  it('should render a vertical layout article card', () => {
    assertLayout(wrapper, layouts.VERTICAL_LAYOUT, '.vertical');
  });

  it('should render a reverse horizontal layout article card', () => {
    assertLayout(wrapper, layouts.HORIZONTAL_REVERSE_LAYOUT, '.reverse');
  });

  it('should render a minimal layout article card', () => {
    assertLayout(wrapper, layouts.MINIMAL_LAYOUT, '.minimal');
  });

  it('should render a minimal layout with author information article card', () => {
    assertLayout(wrapper, layouts.MINIMAL_AUTHOR_LAYOUT, '.author');
  });
});
