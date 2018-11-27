import React from "react";
import { shallow } from 'enzyme';

import { NetWorkPopup } from "./index";

describe('The NetworkPopup container', () => {
  const props = {
    networkError: false,
  };

  it('should render without crashing', () => {
    expect(() => shallow(<NetWorkPopup {...props} />));
  });
});
