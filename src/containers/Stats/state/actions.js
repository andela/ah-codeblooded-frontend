import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAIL,
  REFRESH_STATS_REQUEST,
  REFRESH_STATS_SUCCESS,
  REFRESH_STATS_FAIL,
} from './types';
import api from '../../../utils/api';

const fetchStatsRequest = () => ({
  type: FETCH_STATS_REQUEST,
});

const fetchStatsSuccess = response => ({
  type: FETCH_STATS_SUCCESS,
  payload: { stats: response.data.stats },
});

const fetchStatsFailure = () => ({
  type: FETCH_STATS_FAIL,
  payload: { error: 'Something went wrong. Try again.' },
});

export const fetchStatsAction = () => (dispatch) => {
  dispatch(fetchStatsRequest());
  return api.get('/article-stats/')
    .then(({ data }) => {
      dispatch(fetchStatsSuccess(data));
    })
    .catch(() => {
      dispatch(fetchStatsFailure());
    });
};

// refresh stats
const refreshStatsRequest = () => ({
  type: REFRESH_STATS_REQUEST,
});

const refreshStatsSuccess = response => ({
  type: REFRESH_STATS_SUCCESS,
  payload: { stats: response.data.stats },
});

const refreshStatsFailure = () => ({
  type: REFRESH_STATS_FAIL,
  payload: { error: 'Something went wrong. Try again.' },
});

export const refreshStatsAction = () => (dispatch) => {
  dispatch(refreshStatsRequest());
  return api.get('/article-stats/')
    .then(({ data }) => {
      dispatch(refreshStatsSuccess(data));
    })
    .catch(() => {
      dispatch(refreshStatsFailure());
    });
};
