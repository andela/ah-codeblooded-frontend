import React from 'react';
import ReactDOM from 'react-dom';
import './assets/index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from '././store/index';

const store = configureStore();

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
document.getElementById('root')
);

serviceWorker.unregister();
