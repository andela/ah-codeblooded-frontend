import React from 'react';
import { mount, shallow } from 'enzyme';
import ArticleShare from "./index";


describe('The ArticleShare component', () => {
  const props = {
    article: {
      title: 'Awesome article',
      url: 'https://authors-haven.io/articles/an-awesome-article',
    },
  };

  let wrapper;

  let renderedLinks;

  beforeEach(() => {
    wrapper = mount(<ArticleShare {...props} />);

    renderedLinks = wrapper.find('ShareButton');
  });

  it('should render without crashing', () => {
    expect(() => shallow(<ArticleShare {...props} />)).not.toThrow();
  });

  it('should render all links', () => {
    expect(renderedLinks.length).toBe(4);
  });
});
