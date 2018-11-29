import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import api from './api';
import editorState from '../pages/Articles/Create/state/editorState';
import { initialState } from '../pages/Articles/state/reducer';

const middlewares = [thunk];
export const mockStore = configureMockStore(middlewares);
export const axiosMock = new MockAdapter(api);

export const testReducer = (action, value, result, reducer, state) => {
  const newState = reducer(state, action);
  expect(newState[value])
    .toEqual(result);
};

export const user = {
  username: 'gitaumoses4',
  image: 'https://avatars3.githubusercontent.com/u/25629064?s=460&v=4',
  email: 'gitaumoses4@gmail.com',
  password: 'Password1!',
};

export const article = {
  title: 'The Dungeon Dragon',
  body: JSON.stringify(editorState),
  description: 'The Dungeon Dragon Story',
  slug: 'the-dungeon-dragon-12jhgf323',
  tags: ['dragons', 'dungeon'],
  published: false,
  author: user,
};

export const comment = {
  id: 8,
  body: "Here we go",
  author: {
    username: "gitaumoses4",
    bio: "This is my story, this is my song. Praising my saviour all thy day long",
    image: "https://res.cloudinary.com/codeblooded/image/upload/v1542154278/lwwun6s61usi3jnxjulz.jpg",
  },
  likes: {
    count: 0,
    me: false,
  },
  dislikes: {
    count: 0,
    me: false,
  },
  parent: null,
  created_at: "2018-11-21T23:41:34.216533Z",
};

export const articleCRUD = {
  ...initialState,
};


export const checkSnapshot = (component) => {
  const snap = shallow(component);
  expect(snap).toMatchSnapshot();
};

export const loginUser = (usr = user) => {
  localStorage.setItem("user", JSON.stringify(usr));
};
