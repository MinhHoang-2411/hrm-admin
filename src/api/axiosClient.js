import axios from 'axios';
import {getAuth} from 'utils/auth/index';

const URL_API_ADMIN = process.env.REACT_APP_API_URL_AMDIN;

const axiosClient = axios.create({
  baseURL: URL_API_ADMIN,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;

axiosClient.defaults.headers.Accept = 'application/json';
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const auth = getAuth();
    if (auth) {
      config.headers = {
        Authorization: `Bearer ${auth}`,
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);