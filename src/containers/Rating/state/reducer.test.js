import rate from './reducer';
import { CURRENT_RATE, UPDATE_RATE, RATE_ERROR } from './types';

describe('Rating reducer', () => {
  const initialState = {
    state: {},
    errors: {},
    success: false,
    failure: false,
  };
  const val = { data: { rating: 2 } };
  const action = { payload: {} };

  it('should return the initial state when there is no action', () => {
    expect(rate(initialState, action)).toEqual(initialState);
  });
  it('should handle CURRENT_RATE', () => {
    action.type = CURRENT_RATE;
    expect(rate(initialState.state, action)).toEqual({ success: true, state: {} });
  });
  it('should handle UPDATE_RATE', () => {
    action.type = UPDATE_RATE;
    action.payload = val;
    expect(rate(initialState.state, action)).toEqual({ success: true, state: val.data.rating });
  });
  it('should handle RATE_ERROR', () => {
    action.type = RATE_ERROR;
    expect(rate(initialState.state, action)).toEqual({ failure: true, state: undefined });
  });
});
