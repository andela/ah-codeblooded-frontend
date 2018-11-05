import React from 'react';
import ArticleProfileView from './index';
import { article, checkSnapshot, user } from '../../utils/testHelpers';

describe('<ArticleProfileView/> component', () => {
  it('should render an <ArticleProfileView/> component', () => {
    checkSnapshot(<ArticleProfileView article={article} user={user} />);
  });
});
