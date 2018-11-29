import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';
import './assets/css/index.scss';
import Router from './routes';
import * as serviceWorker from './serviceWorker';
import store from './store';

import './env';
import ConnectedNetWorkError from "./containers/NetworkPopup";

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <ConnectedNetWorkError />
      <Router />
    </React.Fragment>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
