import React from "react";
import { mount, shallow } from 'enzyme';

import { NetWorkPopup } from "./index";

describe('The NetworkPopup container', () => {
  const props = {
    networkError: false,
  };

  it('should render without crashing', () => {
    expect(() => shallow(<NetWorkPopup {...props} />)).not.toThrow();
  });

  it('should mount on a full dom without crashing', () => {
    expect(() => mount(<NetWorkPopup {...props} />)).not.toThrow();
  });
});
