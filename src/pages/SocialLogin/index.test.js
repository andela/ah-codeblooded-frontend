import { shallow } from "enzyme";
import React from "react";
import LoginPage from "../LoginPage/index";
import { SocialLogin } from "../SocialLogin/index";
import configureStore from "redux-mock-store";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";

const mockstore = configureStore();
const store = mockstore();

describe("<LoginPage/>", () => {
  beforeEach(() => {
    store.clearActions();
  });
  it("renders the <Login /> component", () => {
    const wrapper = shallow(<LoginPage history={{ push() {} }} />);
    expect(wrapper.contains(<SocialLogin />));
  });
  it("Test socialLogin find Googlelogin button", () => {
    const wrapper = shallow(<SocialLogin history={{ push() {} }} />);
    expect(wrapper.find(GoogleLogin).length).toEqual(1);
  });
  it("Test socialLogin find FacebookLogin button", () => {
    const wrapper = shallow(<SocialLogin history={{ push() {} }} />);
    expect(wrapper.find(FacebookLogin).length).toEqual(1);
  });
});
