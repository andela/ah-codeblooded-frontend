import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import api from './api';
import editorState from '../pages/Articles/CreateUpdate/state/editorState';
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
export const articleCRUD = {
  ...initialState,
};


export const checkSnapshot = (component) => {
  const snap = shallow(component);
  expect(snap).toMatchSnapshot();
};
