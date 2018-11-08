import configureMockStore from 'redux-mock-store';

import { middlewares } from '../store';

const mockStore = configureMockStore(middlewares);

export default mockStore;
