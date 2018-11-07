import axios from "axios";
import config from "./config";
import { getToken } from "./auth";

const token = getToken();

const uri = config.BASE_URL;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Token ${token}`
};

const api = {
  get(endpoint) {
    return axios({
      method: "get",
      url: `${uri}${endpoint}`,
      data: {},
      config: {
        headers
      }
    });
  },
  post(endpoint, postData) {
    return axios({
      method: "post",
      url: `${uri}${endpoint}`,
      data: postData,
      config: {
        headers
      }
    });
  },
  put(endpoint, postData = null) {
    return axios({
      method: "post",
      url: `${uri}${endpoint}`,
      data: JSON.stringify(postData),
      config: {
        headers
      }
    });
  },
  delete(endpoint) {
    return axios({
      method: "delete",
      url: `${uri}${endpoint}`,
      data: {},
      config: {
        headers
      }
    });
  }
};

export default api;
