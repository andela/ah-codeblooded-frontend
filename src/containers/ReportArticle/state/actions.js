import {
  FETCH_REPORT_TYPES,
  FETCH_REPORT_TYPES_SUCCESS,
  FETCH_REPORT_TYPES_FAILURE,
  REPORTING_SUCCESS,
  REPORTING_FAILURE,
  REPORT_MORE_THAN_ONCE,
  REPORT_WITHOUT_DATA,
} from "./types";
import api from '../../../utils/api';


export const fetchingViolationTypes = () => ({
  type: FETCH_REPORT_TYPES,
});

export const fetchViolationsFail = errors => ({
  type: FETCH_REPORT_TYPES_FAILURE,
  payload: errors,
});

export const fetchViolationsSuccess = payload => ({
  type: FETCH_REPORT_TYPES_SUCCESS,
  payload,
});

export const reportArticleSuccess = payload => ({
  type: REPORTING_SUCCESS,
  payload,
});

export const reportArticleFail = payload => ({
  type: REPORTING_FAILURE,
  payload,
});

export const fetchViolationTypesAction = () => (dispatch) => {
  dispatch(fetchingViolationTypes());
  return api.get('article-violations/types/')
    .then((res) => {
      dispatch(fetchViolationsSuccess(res.data.data));
    }).catch((errors) => {
      dispatch(fetchViolationsFail(errors));
    });
};

export const reportArticleAction = (slug, data, callback) => (dispatch) => {
  const url = `articles/${slug}/violations/`;
  return api.post(url, data)
    .then((res) => {
      dispatch(reportArticleSuccess(res.data.message));
      callback();
    }).catch((errors) => {
      if (errors.response) {
        const msg = errors.response.data.data.error ? REPORT_MORE_THAN_ONCE : REPORT_WITHOUT_DATA;
        dispatch(reportArticleFail(msg));
        callback();
      }
    });
};

export default reportArticleAction;
