import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import React from 'react';
import { mount, shallow } from 'enzyme';
import InfiniteScroll from 'react-infinite-scroller';
import { initialState } from './state/reducer';
import { article } from '../../utils/testHelpers';
import ConnectedArticleListing, { ArticleListing } from './index';
import Empty from '../../components/Empty';

const mockStore = configureMockStore([thunk]);

const store = mockStore(initialState);

const props = {
  fetchArticles: jest.fn(),
  isFetching: false,
  articles: {
    articles: {
      results: [
        article,
        {
          ...article,
          slug: 'this-is-a-different-slug',
          published: true,
        },
      ],
    },
  },
};

describe("<ConnectedArticleListing> container component", () => {
  const wrapper = mount(<ConnectedArticleListing store={store} {...props} listName="articles" />);
  const shallowWrapper = shallow(<ArticleListing {...props} />);
  const instance = shallowWrapper.instance();
  const scroll = wrapper.find(InfiniteScroll).instance();

  beforeEach(() => {
    wrapper.setProps({ ...props });
  });

  it('should render a list of two articles', () => {
    expect(wrapper.find('.article-card').length).toEqual(1);
  });

  it('should load more articles', () => {
    instance.loadMore(1, 2);
    expect(props.fetchArticles.mock.calls.length).toEqual(2);
  });

  it('should update the state of pages', () => {
    instance.componentWillReceiveProps({ params: { page: 2 } });
    expect(instance.state.page).toEqual(2);
  });

  it('should render an empty layout if there are no articles', () => {
    wrapper.setProps({ ...props, articles: { articles: { results: [] } } });
    expect(wrapper.find(Empty).length).toEqual(1);
  });

  it('should render the featured articles component', () => {
    wrapper.setProps({ featured: true });
    expect(wrapper.find('.featured').length).toEqual(1);
  });

  it('should scroll if there are more articles', () => {
    wrapper.setProps({ featured: false });
    scroll.props.loadMore(2);
    expect(props.fetchArticles.mock.calls.length).toEqual(2);
  });

  it('should load more if there are more pages', () => {
    wrapper.setProps({ featured: false });
    expect(scroll.props.hasMore).toEqual(false);
  });
});
