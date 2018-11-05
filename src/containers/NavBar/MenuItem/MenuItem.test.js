import React from 'react';
import { checkSnapshot } from '../../../utils/testHelpers';
import MenuItem from './index';

describe('<MenuItem/> component', () => {
  it('Should render a <MenuItem/> correctly', () => {
    checkSnapshot(<MenuItem />);
  });
});
