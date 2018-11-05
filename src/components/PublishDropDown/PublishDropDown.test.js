import React from 'react';
import { mount } from 'enzyme';
import PublishDropDown from './index';

describe('<PubishDropDown/> component', () => {
  const props = {
    publishHandler: jest.fn(),
    draftHandler: jest.fn(),
    onTagChanged: jest.fn(),
    imageChooseCallback: jest.fn(),
    tags: [
      'Andela',
      'Andela Kenya',
    ],
  };
  const wrapper = mount(<PublishDropDown {...props} />);

  it('should render a list of tags from the props', () => {
    wrapper.setProps(props);
    expect(wrapper.find('#tags').length).toEqual(1);
  });

  it('should call publish and draft on click buttons', () => {
    for (let i = 0; i < 2; i += 1) {
      wrapper.find('button').at(i).simulate('click');
    }
    expect(props.publishHandler.mock.calls.length).toEqual(1);
    expect(props.draftHandler.mock.calls.length).toEqual(1);
  });
});
