import axios from 'axios';
import config from './config';
import { getToken } from './auth';
import store from '../store';
import { NETWORK_ERROR_DETECTED, NO_NETWORK_ERROR } from "../containers/NetworkPopup/state/types";

const token = getToken();

const uri = config.BASE_URL;

export const getURL = endpoint => `${uri}${endpoint}`;

const api = axios.create({
  baseURL: uri,
});

api.interceptors.request.use(
  (cfg) => {
    if (token) {
      cfg.headers.authorization = `Token ${token}`;
    }
    return cfg;
  },
);

api.interceptors.response.use(
  (response) => {
    store.dispatch({ type: NO_NETWORK_ERROR });
    return response;
  },
  (error) => {
    if (!error.response) {
      store.dispatch({ type: NETWORK_ERROR_DETECTED });
    }
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.setItem('user', null);
      window.location.assign(`${window.location.protocol}//${window.location.host.toString()}/login`);
    }
    return Promise.reject(error);
  },
);
export default api;
