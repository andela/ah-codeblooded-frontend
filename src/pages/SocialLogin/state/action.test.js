import moxios from "moxios";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import socialLogin, { fail, success } from "./actions";
import { SUCCESS_LOGIN, FAIL_LOGIN } from "./types";

const login = {
  provider: "google",
  access_token: "fake-token-here",
};
const getAction = [
  { type: SUCCESS_LOGIN, payload: login },
];
const expectedActions = [
  { type: SUCCESS_LOGIN, payload: login },
  { type: FAIL_LOGIN, payload: login },
];
const urlGoogle = "https://accounts.google.com/signin/&oauthgdpr=1&xsrfsig=AHgIfE-ybDu6ChemaBvNZ2iDWuQ3lP8jLw&flowName=GeneralOAuthFlow";
const urlFacebook = "https://www.facebook.com/v2.3/dialog/oauth?app_id=68148899890022";
const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const store = mockStore({
  isAuthenticated: false,
});
const compare = expect(store.getActions()).toEqual([]);

describe("Social Login actions", () => {
  beforeEach(() => {
    moxios.install();
    jest.setTimeout = 300000;
    store.clearActions();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it("google-login should trigger the correct actions", () => {
    moxios.stubRequest(urlGoogle, {
      status: 200,
      response: login,
    });
    store
      .dispatch(socialLogin("google", { token: "abcdefgh" }, []))
      .then(() => {
        compare();
      });
  });

  it("facebook-login should trigger the correct actions", () => {
    moxios.stubRequest(urlFacebook, {
      status: 400,
      response: login,
    });
    store.dispatch(socialLogin("facebook", { token: "abcdefghe" }, []))
      .catch(() => {
        compare();
      });
  });

  it("dispatches the correct action and payload in action-creator ", () => {
    store.dispatch(success(login));
    expect(store.getActions()).toEqual(getAction);
    store.dispatch(fail(login));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
