import React from 'react';
import { shallow } from 'enzyme';
import DropDown from './index';
import DropDownItem from '../DropDownItem';

describe('<DropDown/> component', () => {
  it('renders a <DropDown/> with dropdown items', () => {
    const wrapper = shallow(
      <DropDown
        id="dropdown"
        list={
        <>
          <DropDownItem>One</DropDownItem>
          <DropDownItem>Two</DropDownItem>
          <DropDownItem>Three</DropDownItem>
          <DropDownItem>Four</DropDownItem>
          </>
        }
      />,
    );

    expect(wrapper.find('ul').length).toEqual(1);
  });

  it('renders a <DropDown/> with custom layout', () => {
    const wrapper = shallow(
      <DropDown id="dropdown">
        <div>
          <h1>Hello World</h1>
          <p>This is a paragraph</p>
        </div>
      </DropDown>,
    );
    expect(wrapper.find('h1').length).toEqual(1);
  });
});
