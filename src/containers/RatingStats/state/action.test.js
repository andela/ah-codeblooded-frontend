import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import api from '../../../utils/api';
import config from '../../../utils/config';
import {
  fetchingRatings,
  fetchingRatingSuccess,
  fetchingRatingsFailure,
  fetchRatingsAction,
} from './actions';
import { FETCH_RATINGS, FETCH_RATINGS_SUCCESS, FETCH_RATINGS_FAILURE } from './types';

const rating = { rating: { rating: 5 } };
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

let store;

describe('Rating actions', () => {
  const mock = new MockAdapter(api);
  const slug = 'fake-slug-md23';
  const url = `${config.BASE_URL}articles/${slug}/ratings/`;
  store = mockStore({});
  afterEach(() => {
    store.clearActions();
    mock.reset();
  });
  it('should dispatch FETCH_RATINGS', () => {
    store.dispatch(fetchingRatings());
    expect(store.getActions()).toEqual([{ type: FETCH_RATINGS }]);
  });
  it('should dispatch FETCH_RATINGS_SUCCESS', () => {
    store.dispatch(fetchingRatingSuccess());
    expect(store.getActions()).toEqual([{ payload: undefined, type: FETCH_RATINGS_SUCCESS }]);
  });
  it('should dispatch FETCH_RAITINGS_FAILURE', () => {
    store.dispatch(fetchingRatingsFailure());
    expect(store.getActions()).toContainEqual({ type: FETCH_RATINGS_FAILURE });
  });
  it('should dispatch FETCH_RATINGS_SUCCESS when getting current rating', () => {
    mock.onGet(url).reply(201, rating);
    store
      .dispatch(fetchRatingsAction(slug))
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: FETCH_RATINGS_SUCCESS,
          payload: rating,
        });
      })
      .catch(() => {});
  });
});
