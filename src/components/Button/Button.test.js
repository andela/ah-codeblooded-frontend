import { render, mount } from 'enzyme';
import React from 'react';
import Button from '.';

describe('The Button component', () => {
  it('should render without crashing', () => {
    expect(render(<Button />).html()).toEqual('Click Here');
  });

  it('should mount in a full DOM', () => {
    expect(mount(<Button />).contains(<button type="button">Click Here</button>)).toBe(true);
  });
});
