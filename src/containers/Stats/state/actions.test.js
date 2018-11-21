import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAIL,
  REFRESH_STATS_REQUEST,
  REFRESH_STATS_SUCCESS,
  REFRESH_STATS_FAIL,
} from './types';
import { fetchStatsAction, refreshStatsAction } from "./actions";
import { axiosMock, mockStore } from "../../../utils/testHelpers";
import { getURL } from "../../../utils/api";
import { successData } from "./mock";

describe('The Stats actions', () => {
  const url = getURL('article-stats/');

  const store = mockStore({});

  const successResponse = { data: successData };

  afterEach(() => {
    store.clearActions();
    axiosMock.reset();
  });

  it('should dispatch FETCH_STATS_REQUEST on fetchStatsAction', () => {
    axiosMock.onGet(url).reply(200, successResponse);
    store.dispatch(fetchStatsAction());
    expect(store.getActions()).toContainEqual({ type: FETCH_STATS_REQUEST });
  });

  it('should dispatch FETCH_STATS_SUCCESS on fetchStatsAction success', () => {
    axiosMock.onGet(url).reply(200, successResponse);
    store.dispatch(fetchStatsAction())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: FETCH_STATS_SUCCESS,
          payload: { stats: successData.stats },
        });
      });
  });

  it('should dispatch FETCH_STATS_FAIL on fetchStatsAction failure', () => {
    axiosMock.onGet(url).reply(400, {});
    store.dispatch(fetchStatsAction())
      .catch(() => {
        expect(store.getActions()).toContainEqual({
          type: FETCH_STATS_FAIL,
          payload: { error: 'Something went wrong. Try again.' },
        });
      });
  });

  it('should dispatch REFRESH_STATS_REQUEST on refreshStatsAction', () => {
    axiosMock.onGet(url).reply(200, successResponse);
    store.dispatch(refreshStatsAction());
    expect(store.getActions()).toContainEqual({ type: REFRESH_STATS_REQUEST });
  });

  it('should dispatch REFRESH_STATS_SUCCESS on refreshStatsAction success', () => {
    axiosMock.onGet(url).reply(200, successResponse);
    store.dispatch(refreshStatsAction())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: REFRESH_STATS_SUCCESS,
          payload: { stats: successData.stats },
        });
      });
  });

  it('should dispatch REFRESH_STATS_FAIL on refreshStatsAction failure', () => {
    axiosMock.onGet(url).reply(400, {});
    store.dispatch(refreshStatsAction())
      .catch(() => {
        expect(store.getActions()).toContainEqual({
          type: REFRESH_STATS_FAIL,
          payload: { error: 'Something went wrong. Try again.' },
        });
      });
  });
});
