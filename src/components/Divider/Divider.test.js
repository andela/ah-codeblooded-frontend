import React from 'react';
import { checkSnapshot } from '../../utils/testHelpers';
import Divider, { VerticalDivider } from './index';

describe('horizontal and vertical <Divider/> component', () => {
  it('should render a horizontal <Divider/>', () => {
    checkSnapshot(<Divider />);
  });

  it('should render a vertical <VerticalDivider/>', () => {
    checkSnapshot(<VerticalDivider />);
  });
});
