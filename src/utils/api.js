import axios from "axios";
import config from "./config";
import { getToken } from "./auth";
const token = getToken();
const uri = config.BASE_URL;
export const getURL = endpoint => `${uri}${endpoint}`;
const api = axios.create({
  baseURL: uri
});
api.interceptors.request.use(c => {
  if (token) {
    c.headers.authorization = `Token ${token}`;
  }
  return c;
});
export default api;
