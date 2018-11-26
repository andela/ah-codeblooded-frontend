import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import FavoriteArticle from './index';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  favorite: {
    favorite: true,
  },
});

const props = {
  favoriteArticle: jest.fn(),
};

const user = {
  username: 'bevkololi',
  image: '',
  bio: 'This is some bio',
};

const favouriteUser = {
  username: 'mosesgitau',
  image: '',
  bio: 'This is some bio',
};

const article = {
  title: 'The Dungeon Dragon',
  body: 'This is a body',
  description: 'The Dungeon Dragon Story',
  slug: 'the-dungeon-dragon-12jhgf323',
  tags: ['dragons', 'dungeon'],
  published: false,
  author: { ...favouriteUser },
};
const wrapper = mount(<FavoriteArticle {...props} store={store} user={user} article={article} />);

describe('Favorite Article container', () => {
  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should enable users to favourite articles', () => {
    wrapper.find('button').simulate('click');
    expect(props.favoriteArticle.mock.calls.length).toEqual(0);
  });
});
