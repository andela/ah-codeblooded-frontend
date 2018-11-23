import { shallow } from 'enzyme';
import React from 'react';
import { article, mockStore, user } from '../../utils/testHelpers';
import MyArticles from './index';
import layouts from '../ArticleCard/layouts';

const store = mockStore({});

describe('<MyArticles> component page', () => {
  const wrapper = shallow(<MyArticles store={store} user={user} />);
  const instance = wrapper.instance();
  it('should have two tabs for drafts and published articles', () => {
    expect(wrapper.find('.tab').length).toEqual(2);
  });

  it('should use a minimal layout', () => {
    expect(instance.layoutHandler()).toEqual(layouts.MINIMAL_LAYOUT);
  });

  it('should filter the drafts based on a list of articles', () => {
    expect(instance.filterDrafts([article]).length).toEqual(1);
  });

  it('should filter the published articles', () => {
    expect(instance.filterPublished([article]).length).toEqual(0);
  });
});
