import React from "react";
import { shallow } from 'enzyme';
import { StatsPage } from "./index";

describe('The Stats page', () => {
  const props = {
    isRefreshing: false,
  };

  it('should render without crashing', () => {
    expect(() => shallow(<StatsPage {...props} />)).not.toThrow();
  });
});
