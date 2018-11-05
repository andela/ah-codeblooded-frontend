import React from 'react';
import { render, mount, shallow } from 'enzyme';
import TextInput from '.';


describe('The TextInput component', () => {
  it('should render without crashing', () => {
    const wrapper = render(
      <TextInput
        onChange={() => {}}
        value="Joe"
        label="Name"
        name="name"
        type="text"
      />,
    );

    const html = '<input type="text" name="name" id="name" value="Joe" class="validate ">'
      + '<label for="name">Name</label>';

    expect(wrapper.html()).toEqual(html);
  });

  it('should display errors', () => {
    const errors = ['Foo', 'Bar'];
    const wrapper = shallow(
      <TextInput
        onChange={() => {}}
        errors={errors}
        value="Joe"
        label="Name"
        name="name"
        type="text"
      />,
    );

    const errorLabels = wrapper.find('.helper-text');

    expect(errorLabels.length).toEqual(2);

    expect(
      wrapper.contains(
        <span className="helper-text" data-error={errors[0]} data-success="right" />,
      ),
    ).toBe(true);

    expect(
      wrapper.contains(
        <span className="helper-text" data-error={errors[0]} data-success="right" />,
      ),
    ).toBe(true);
  });

  it('should trigger onChange hook', () => {
    // create mock fn
    const onChangeMock = jest.fn();
    // create a wrapper for the component
    const wrapper = mount(
      <TextInput
        onChange={onChangeMock}
        value="Joe"
        label="Name"
        name="name"
        type="text"
      />,
    );
    // we simulate change the input on the component
    wrapper.find('input').simulate('change');
    // expect the mock fn to have  been called
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
