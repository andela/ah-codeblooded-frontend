import React from 'react';
import { shallow } from 'enzyme';
import ArticleViewLoader from './index';

describe('<ArticleLoader/> component', () => {
  it('renders <ArticleLoader/> component without crashing', () => {
    const snapShot = shallow(<ArticleViewLoader />);
    expect(snapShot).toMatchSnapshot();
  });
});
