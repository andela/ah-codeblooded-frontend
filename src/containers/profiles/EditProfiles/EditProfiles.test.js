import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import EditProfile, { mapStateToProps } from './index';

const file = new Blob(['filecontent'], { type: 'image/jpg' });

const user = {
  username: 'bevkololi',
  image: '',
  bio: 'This is some bio',
};
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  userProfiles: {
    profile: { ...user },
  },
});

const props = {
  user,
  getUserProfile: jest.fn(),
  editUserProfile: jest.fn(),
  onChange: jest.fn(),
};

const history = createMemoryHistory(`profiles/edit/${user.username}`);

const wrapper = mount(<EditProfile {...props} store={store} history={history} />);
const instance = wrapper.instance();

describe('Edit Profile container', () => {
  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should ensure users can update their profile image', () => {
    wrapper.find('form').simulate('submit');
    expect(props.editUserProfile.mock.calls.length).toEqual(0);
  });

  it('should correctly maps state to props', () => {
    const state = {
      userProfiles: {
        success: true,
        failure: false,
        profile: {
          username: 'myname',
          bio: 'mybio',
          image: '',
        },
      },
    };
    const expected = {
      profile: {
        username: 'myname',
        bio: 'mybio',
        image: '',
      },
    };
    expect(mapStateToProps(state)).toEqual(expected);
  });

  it('should ensure users can update bio and image', () => {
    wrapper.find('textarea').simulate('change');
    wrapper.setProps({ profile: user });
    expect(wrapper.find('textarea').text()).toEqual('This is some bio');

    const readAsText = jest.fn();
    const addEventListener = jest.fn((_, evtHandler) => { evtHandler(); });
    const dummyFileReader = { addEventListener, readAsText, result: 'fileContent' };
    window.FileReader = jest.fn(() => dummyFileReader);

    wrapper.find('#upload-image').simulate('change', { target: { files: [file] } });

    jest.spyOn(instance, 'setState');

    expect(instance.state).toEqual({});
  });
});
