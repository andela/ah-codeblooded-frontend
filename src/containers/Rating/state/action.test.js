import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import api from '../../../utils/api';
import config from '../../../utils/config';
import {
  rateArticle, currentRate, start, fail, success,
} from './action';
import { CURRENT_RATE, UPDATE_RATE, RATE_ERROR } from './types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

let store;

describe('Rating actions', () => {
  const mock = new MockAdapter(api);
  const slug = 'fake-slug-md23';
  const url = `${config.BASE_URL}articles/${slug}/rate/`;
  const msg = { message: 'it works' };
  const err = [{ message: 'I failed you' }];
  const val = 2;

  store = mockStore({});

  afterEach(() => {
    store.clearActions();
    mock.reset();
  });

  it('should dispatch CURRENT_RATE', () => {
    store.dispatch(start());
    expect(store.getActions()).toContainEqual({ type: CURRENT_RATE });
  });

  it('should dispatch UPDATE_RATE', () => {
    store.dispatch(success(val));
    expect(store.getActions()).toEqual([
      {
        type: UPDATE_RATE,
        payload: val,
      },
    ]);
  });

  it('should dispatch RATE_ERROR', () => {
    store.dispatch(fail());
    expect(store.getActions()).toContainEqual({ type: RATE_ERROR });
  });

  it('should dispatch UPDATE_RATE when rating is successful', () => {
    mock.onPut(url).reply(200, msg);
    store
      .dispatch(rateArticle(val, slug))
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: UPDATE_RATE,
          payload: msg,
        });
      })
      .catch(() => {});
  });

  it('should dispatch CURRENT_RATE when getting current rating', () => {
    mock.onGet(url).reply(200, val);
    store
      .dispatch(currentRate(slug))
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: CURRENT_RATE,
          payload: val,
        });
      })
      .catch(() => {});
  });

  it('should dispatch RATE_ERROR when rating fails', () => {
    mock.onPut(url).reply(403, err);
    store
      .dispatch(rateArticle(val))
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: RATE_ERROR,
          payload: err.message,
        });
      })
      .catch(() => {});
  });
});
