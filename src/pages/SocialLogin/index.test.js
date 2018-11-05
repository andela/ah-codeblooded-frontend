import { shallow } from 'enzyme';
import React from "react";
import configureStore from "redux-mock-store";
import SocialLogin from "./index";

const mockstore = configureStore();
const store = mockstore({});

const wrapper = shallow(<SocialLogin store={store} />);

describe("<LoginPage/>", () => {
  beforeEach(() => {
    store.clearActions();
  });

  it("renders the <Login /> component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
