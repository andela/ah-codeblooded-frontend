import pageProgress from './reducer';
import { pageLoadingAction, pageLoadedAction } from './actions';

describe('page progress reducer', () => {
  it('checks the initial state', () => {
    expect(pageProgress(undefined, { type: 'DUMMY_ACTION' })).toMatchSnapshot();
  });

  it('checks the page loading and loaded action', () => {
    expect(pageProgress(undefined, pageLoadingAction())).toMatchSnapshot();
    expect(pageProgress(undefined, pageLoadedAction())).toMatchSnapshot();
  });
});
