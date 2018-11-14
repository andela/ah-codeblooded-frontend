import React from "react";
import { mount } from "enzyme";
import TextInput from ".";

describe("The TextInput component", () => {
  const props = {
    value: "Joe",
    label: "Name",
    name: "name",
    type: "text",
    errors: ["Foo", "Bar"],
    onChange: jest.fn(),
  };

  let wrapper;
  let input;

  beforeEach(() => {
    wrapper = mount(<TextInput {...props} />);

    input = wrapper.find('input');
  });

  it("should have the correct props", () => {
    const inputProps = input.props();

    expect(inputProps.name).toEqual("name");

    expect(inputProps.type).toEqual("text");

    expect(inputProps.value).toEqual("Joe");
  });

  it("should display the correct label", () => {
    expect(wrapper.html()).toContain('<label for="name">Name</label>');
  });

  it("should display errors", () => {
    const errorLabels = wrapper.find(".helper-text");

    expect(errorLabels.length).toEqual(2);

    expect(wrapper.html()).toContain("Foo", "Bar");
  });

  it("should trigger onChange hook", () => {
    const target = { name: "Name", value: "Jane" };

    input.simulate("change", { target });

    expect(props.onChange).toHaveBeenCalledTimes(1);

    expect(props.onChange).toHaveBeenNthCalledWith(1, expect.objectContaining({ target }));
  });
});
