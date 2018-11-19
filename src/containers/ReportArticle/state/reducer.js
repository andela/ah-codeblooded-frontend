import {
  FETCH_REPORT_TYPES, FETCH_REPORT_TYPES_FAILURE, FETCH_REPORT_TYPES_SUCCESS,
  REPORTING_SUCCESS, REPORTING_FAILURE,
} from "./types";

const initialState = {
  reportTypes: {},
  isReporting: false,
  errors: "",
  message: "",
  success: false,
  hasError: false,
};

const articleReporting = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_REPORT_TYPES:
      return { ...state, isReporting: true };

    case FETCH_REPORT_TYPES_SUCCESS:
      return {
        ...state,
        reportTypes: payload,
      };

    case FETCH_REPORT_TYPES_FAILURE:
      return {
        ...state,
        errors: payload,
        isReporting: false,
      };

    case REPORTING_SUCCESS:
      return {
        ...state,
        message: payload,
        isReporting: false,
        success: true,
      };
    case REPORTING_FAILURE:
      return {
        ...state,
        errors: payload,
        isReporting: false,
        hasErrors: true,
      };

    default:
      return state;
  }
};

export default articleReporting;
