import React from 'react';
import { mount } from 'enzyme';
import ImageSelector from './index';

describe('<ImageSelector/> component', () => {
  it('should render an <ImageSelector/> component', () => {
    const props = {
      images: ['https://avatars3.githubusercontent.com/u/25629064?s=460&v=4',
        'https://gitaumoses4.github.io/images/general/logo.png'],
      chosenImage: 'https://gitaumoses4.github.io/images/general/logo.png',
      onChange: jest.fn(),
    };


    const wrapper = mount(<ImageSelector {...props} />);

    wrapper.find('.images').find('button').at(1).simulate('click');
    expect(props.onChange.mock.calls.length).toEqual(2);
  });
});
