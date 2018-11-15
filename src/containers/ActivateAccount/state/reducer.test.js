import reducer from './reducer';
import {
  ACTIVATE_USER,
  ACTIVATE_ERROR,
  ACTIVATE_SUCCESS,
} from './types';
import { state } from './mock';

const initialState = state;
const action = { payload: {} };

describe('Activate Reducer __test__', () => {
  it('should return initial state when there is no action', () => {
    expect(reducer(initialState, action))
      .toEqual(state);
  });

  it('should handle actions', () => {
    action.type = ACTIVATE_USER;
    expect(reducer(state, action).isActivating).toEqual(false);
    action.type = ACTIVATE_SUCCESS;
    expect(reducer(state, action).activationSuccess).toEqual(true);
    action.type = ACTIVATE_ERROR;
    expect(reducer(state, action).activationFailed).toEqual(true);
  });
});
