import configureStore from 'redux-mock-store';
import { pageLoadedAction, pageLoadingAction } from './actions';

const mockStore = configureStore();
const store = mockStore();

describe('page loading actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('dispatches page loading then page loaded', () => {
    store.dispatch(pageLoadingAction());
    store.dispatch(pageLoadedAction());
    expect(store.getActions()).toMatchSnapshot();
  });
});
