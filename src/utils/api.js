import axios from 'axios';
import UrlPattern from "url-pattern";
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

/*
Perform manipulation on request config before the request is made.
- set token
 */
api.interceptors.request.use(
  (cfg) => {
    if (token) {
      cfg.headers.authorization = `Token ${token}`;
    }
    return cfg;
  },
);

/*
An array defining routes that should never cause a network error.
 */
const NW_ERR_BLACKLISTED_ROUTES = [
  'articles/:slug/reactions/',
];

/*
Check whether an error response is network error blacklisted.
 */
const isNetworkErrorBlacklisted = (error) => {
  let isBlacklisted = false;
  NW_ERR_BLACKLISTED_ROUTES.forEach((route) => {
    const pattern = new UrlPattern(route);
    isBlacklisted = pattern.match(error.config.url.split(uri)[1]) ? true : isBlacklisted;
  });
  return isBlacklisted;
};

/*
Intercept request responses and perform actions that need to be performed
before returning to the promise.
- handle network errors
- handle auth errors
 */
api.interceptors.response.use(
  (response) => {
    store.dispatch({ type: NO_NETWORK_ERROR });
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.setItem('user', null);
      window.location.assign(`${window.location.protocol}//${window.location.host.toString()}/login`);
    }
    if (!error.response && !isNetworkErrorBlacklisted(error)) {
      store.dispatch({ type: NETWORK_ERROR_DETECTED });
    }
    return Promise.reject(error);
  },
);

export default api;
