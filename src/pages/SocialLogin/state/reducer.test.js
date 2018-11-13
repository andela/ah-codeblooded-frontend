import social from "./socialReducer";

describe("USERS_LOGIN_SUCCESS", () => {
  test("test returns correct state after success", () => {
    const state = {
      state: {
        email: "test@email.com",
        usaername: "jon doe",
        token: "token"
      }
    };
    const action = { type: "SUCCESS_LOGIN", payload: state };
    const expectedState = { failure: false, success: true, state };
    expect(social(undefined, action)).toEqual(expectedState);
  });
  test("returns correct state", () => {
    const state = {
      state: {
        email: "test@email.com",
        username: "john doe"
      }
    };
    const action = { type: "SUCCESS_LOGIN", payload: state };
    const expectedState = { failure: false, success: true, state };
    expect(social(undefined, action)).toEqual(expectedState);
  });
  test("test returns correct state after fail", () => {
    const state = {};
    const action = { type: "FAIL LOGIN INE", state };
    const expectedState = { failure: false, success: false, state };
    expect(social(undefined, action)).toEqual(expectedState);
  });
});
