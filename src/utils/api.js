import axios from 'axios';
import config from './config';
import { getToken } from './auth';

const token = getToken();

const uri = config.BASE_URL;

export const getURL = endpoint => `${uri}${endpoint}`;

const api = axios.create({
  baseURL: uri,
});

api.interceptors.request.use((c) => {
  if (token) {
    c.headers.authorization = `Token ${token}`;
  }
  return c;
});

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
