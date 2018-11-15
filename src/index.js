import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import './assets/css/index.scss';
import Router from './routes';
import * as serviceWorker from './serviceWorker';
import store from './store';

import './env';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
