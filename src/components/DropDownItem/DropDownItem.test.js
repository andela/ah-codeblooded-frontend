import React from 'react';
import { checkSnapshot } from '../../utils/testHelpers';
import DropDownItem from './index';

describe('<DropDown> component render', () => {
  it('should render a <DropDownItem> component without crashing', () => {
    checkSnapshot(<DropDownItem />);
  });
});
