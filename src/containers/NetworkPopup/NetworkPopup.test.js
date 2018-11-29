import React from "react";
import { mount, shallow } from 'enzyme';

import { NetWorkPopup } from '.';

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

  it('should trigger reload of the current page when button is clicked', () => {
    window.location.assign = jest.fn();
    const initialHref = window.location.href;
    const wrapper = mount(<NetWorkPopup {...props} />);
    wrapper.find('button').simulate('click');
    expect(window.location.assign).toBeCalledWith(initialHref);
  });
});
