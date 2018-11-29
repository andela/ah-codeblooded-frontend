import {
  FETCH_REPORT_TYPES, FETCH_REPORT_TYPES_SUCCESS,
  REPORTING_SUCCESS, REPORTING_FAILURE,
  REPORT_MORE_THAN_ONCE, FETCH_REPORT_TYPES_FAILURE,
} from './types';
import { fetchTypesResponse, successResponse, errorResp } from './mock';
import reducer from './reducer';


const initialState = {
  reportTypes: {},
  isReporting: false,
  errors: "",
  message: "",
  success: false,
  hasError: false,
};

const action = {
  payload: {},
};

describe('The ArticleReport reducer ', () => {
  it('should return initial state when there is no action', () => {
    expect(reducer(initialState, action))
      .toEqual(initialState);
  });

  it('should return initial state when there is no action', () => {
    expect(reducer(undefined, {}))
      .toEqual(initialState);
  });

  it('should handle FETCH_REPORT_TYPES action', () => {
    action.type = FETCH_REPORT_TYPES;
    expect(reducer(initialState, action)).toEqual({
      reportTypes: {},
      isReporting: true,
      errors: "",
      message: "",
      success: false,
      hasError: false,
    });
  });

  it('should handle FETCH_REPORT_TYPES action', () => {
    action.type = FETCH_REPORT_TYPES_SUCCESS;
    action.payload = fetchTypesResponse.data;
    expect(reducer(initialState, action).reportTypes).toEqual(
      action.payload,
    );
  });

  it('should handle REPORTING_SUCCESS action', () => {
    action.type = REPORTING_SUCCESS;
    action.payload = successResponse.message;
    expect(reducer(initialState, action).message).toEqual(
      action.payload,
    );
  });

  it('should handle REPORTING_SUCCESS action', () => {
    action.type = REPORTING_SUCCESS;
    action.payload = successResponse.message;
    expect(reducer(initialState, action).success).toEqual(
      true,
    );
  });

  it('should handle FETCH_REPORT_TYPES_FAILURE action', () => {
    action.type = FETCH_REPORT_TYPES_FAILURE;
    action.payload = errorResp;
    expect(reducer(initialState, action).isReporting).toEqual(
      false,
    );
  });

  it('should handle REPORTING_FAILURE action', () => {
    action.type = REPORTING_FAILURE;
    action.payload = REPORT_MORE_THAN_ONCE;
    expect(reducer(initialState, action).hasErrors).toEqual(
      true,
    );
  });

  it('should handle REPORTING_FAILURE action', () => {
    action.type = REPORTING_FAILURE;
    action.payload = REPORT_MORE_THAN_ONCE;
    expect(reducer(initialState, action).errors).toEqual(
      REPORT_MORE_THAN_ONCE,
    );
  });
});
