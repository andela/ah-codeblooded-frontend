import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import UsersListing from "./index";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});


const props = {
  user: {
    username:
      "brybzlee",
  },
};

const wrapper = shallow(<UsersListing {...props} store={store} />);

describe('Follow/unfollow list user container', () => {
  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });
});
