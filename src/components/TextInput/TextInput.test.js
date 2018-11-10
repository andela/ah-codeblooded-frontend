import React from 'react';
import { mount, shallow } from 'enzyme';
import TextInput from '.';


describe('The TextInput component', () => {
  const props = {
    value: 'Joe',
    label: 'Name',
    name: 'Name',
    type: 'text',
    errors: ['Foo', 'Bar'],
  };
  it('should display errors', () => {
    const wrapper = shallow(
      <TextInput
        {...props}
        onChange={() => {}}
      />,
    );

    const errorLabels = wrapper.find('.helper-text');

    expect(errorLabels.length).toEqual(2);
  });

  it('should trigger onChange hook', () => {
    const onChangeMock = jest.fn();
    const wrapper = mount(
      <TextInput
        onChange={onChangeMock}
        {...props}
      />,
    );
    wrapper.find('input').simulate('change');
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
