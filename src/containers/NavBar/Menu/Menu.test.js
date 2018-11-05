import React from 'react';
import { checkSnapshot } from '../../../utils/testHelpers';
import Menu from './index';

describe('<Menu/> component', () => {
  it('Should render a <Menu/> without crashing', () => {
    checkSnapshot(<Menu />);
  });
});
