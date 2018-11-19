import React from 'react';
import { shallow } from 'enzyme';

import SettingsPage from ".";

describe('<SettingsPage/>', () => {
  it('renders without crashing', () => {
    shallow(<SettingsPage />);
  });
});
