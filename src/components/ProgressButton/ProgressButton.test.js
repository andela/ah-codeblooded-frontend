import { render, mount } from 'enzyme';
import React from 'react';
import ProgressButton from '.';

describe('The ProgressProgressButton component', () => {
  it('should render without crashing', () => {
    expect(render(<ProgressButton />).html()).toEqual('Click Here');
  });

  it('should mount in a full DOM', () => {
    expect(mount(<ProgressButton />).contains(<ProgressButton type="ProgressButton">Click Here</ProgressButton>)).toBe(true);
  });
});
