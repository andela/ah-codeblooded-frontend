import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  FETCH_REPORT_TYPES, FETCH_REPORT_TYPES_SUCCESS,
  REPORTING_FAILURE, REPORTING_SUCCESS,
} from './types';
import {
  reportArticleAction,
  fetchViolationTypesAction,
  fetchingViolationTypes,
  fetchViolationsSuccess,
  reportArticleSuccess,
  fetchViolationsFail,
} from './actions';
import {
  reportPayload, errorResp,
  successResponse, fetchTypesResponse, reportMalPayload,
} from './mock';
import api, { getURL } from '../../../utils/api';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

const callBack = jest.fn();

describe(' The ArticleReport actions', () => {
  const mock = new MockAdapter(api);
  const url = getURL('article-violations/types/');
  const slug = 'it-came-to-me-in-color';
  const uri = getURL(`articles/${slug}/violations/`);

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
    mock.reset();
  });

  it('should dispacth fetchViolationsType', () => {
    const expectedAction = {
      type: FETCH_REPORT_TYPES,
    };
    expect(fetchingViolationTypes()).toEqual(expectedAction);
  });

  it('should dispatch fetchViolationSuccess', () => {
    store.dispatch(fetchViolationsSuccess(fetchTypesResponse));
    expect(store.getActions()).toContainEqual({
      type: FETCH_REPORT_TYPES_SUCCESS,
      payload: fetchTypesResponse,
    });
  });

  it('should dispatch fetchViolationTypesAction ', () => {
    mock.onGet(url).reply(200, fetchTypesResponse);
    store.dispatch(fetchViolationTypesAction()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: FETCH_REPORT_TYPES,
      });
    });
  });

  it('should dispatch reportArticleSuccess', () => {
    store.dispatch(reportArticleSuccess(successResponse));
    expect(store.getActions()).toContainEqual({
      type: REPORTING_SUCCESS,
      payload: successResponse,
    });
  });

  it('should dispatch reportArticleAction ', () => {
    mock.onPost(uri, reportPayload).reply(200, successResponse);
    store.dispatch(reportArticleAction(slug, reportPayload, callBack))
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: REPORTING_SUCCESS,
          payload: successResponse.message,
        });
      });
  });

  it('should dispatch reportArticleFail', () => {
    mock.onPost(uri).reply(400, errorResp);
    store.dispatch(reportArticleAction(slug, reportMalPayload, callBack))
      .catch(() => {
        expect(store.getActions()).toContainEqual({
          type: REPORTING_FAILURE,
          payload: errorResp,
        });
      });
  });

  it('should dispatch reportArticleFail', () => {
    mock.onGet(url).reply(400, errorResp);
    store.dispatch(fetchViolationTypesAction())
      .catch((errors) => {
        expect(store.getActions()).toContainEqual(fetchViolationsFail(errors));
      });
  });
});
