import { NETWORK_ERROR_DETECTED, NO_NETWORK_ERROR } from "./types";
import reducer from "./reducer";

describe('The NetworkPopup reducer', () => {
  const initialState = {
    network: {},
  };

  const action = { payload: {} };

  it('should return the initial state when there is no action', () => {
    expect(reducer(initialState, action)).toEqual(initialState);
  });

  it('should handle NETWORK_ERROR_DETECTED', () => {
    action.type = NETWORK_ERROR_DETECTED;
    expect(reducer(initialState.network, action))
      .toEqual({ networkError: true });
  });

  it('should handle NO_NETWORK_ERROR', () => {
    action.type = NO_NETWORK_ERROR;
    expect(reducer(initialState.network, action))
      .toEqual({ networkError: false });
  });
});
