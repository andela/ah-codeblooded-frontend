import configureStore from "redux-mock-store";
import * as actioncreator from "./SocialAction";
import { SUCCESS_LOGIN, FAIL_LOGIN } from "./types";

const mockstore = configureStore();
const store = mockstore();

describe("socialLogin", () => {
  beforeEach(() => {
    store.clearActions();
  });
  test("dispatches the correct action and payload ", () => {
    const state = {
      user: { email: "test@email.com", username: "jon doe", token: "token" }
    };
    const get_action = [{ type: SUCCESS_LOGIN, payload: state }];
    store.dispatch(actioncreator.success(state));
    expect(store.getActions()).toEqual(get_action);
  });

  test("dispatches the correct action and payload", () => {
    const payload = "try again";
    const expectedActions = [{ type: FAIL_LOGIN, payload }];
    store.dispatch(actioncreator.fail(payload));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
