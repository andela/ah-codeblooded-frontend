import { shallow } from "enzyme";
import React from "react";
import LoginPage from "../LoginPage/index";
import SocialLogin from "../SocialLogin/index";

describe("<LoginPage/>", () => {
  it("renders the <Login /> component", () => {
    const wrapper = shallow(<LoginPage history={{ push() {} }} />);
    expect(wrapper.contains(<SocialLogin />));
  });
  it("Test socialLogin with google succesfull", () => {
    const wrapper = shallow(<SocialLogin history={{ push() {} }} />);
    wrapper.instance().responseGoogle({
      _provider: "google",
      _token: {
        accessToken: "321-fake-token"
      }
    });
  });
  it("Test socialLogin with google unsuccessfull", () => {
    const wrapper = shallow(<SocialLogin history={{ push() {} }} />);
    wrapper.instance().responseGoogle({
      _provider: "google",
      _token: {
        accessToken: ""
      }
    });
  });
  it("Test socialLogin with facebook successfull", () => {
    const wrapper = shallow(<SocialLogin history={{ push() {} }} />);
    wrapper.instance().responseFacebook({
      _provider: "facebook",
      _token: {
        accessToken: "fake-token-added-321"
      }
    });
  });
  it("Test socialLogin with facebook unsuccessfull", () => {
    const wrapper = shallow(<SocialLogin history={{ push() {} }} />);
    wrapper.instance().responseFacebook({
      _provider: "facebook",
      _token: {
        accessToken: ""
      }
    });
  });
});
