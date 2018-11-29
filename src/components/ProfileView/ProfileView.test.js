import React from 'react';
import ProfileView from './index';
import { checkSnapshot, user } from '../../utils/testHelpers';

describe('<ProfileView/> component', () => {
  it('should render an <ProfileView/> component', () => {
    checkSnapshot(<ProfileView user={user} />);
  });
});
