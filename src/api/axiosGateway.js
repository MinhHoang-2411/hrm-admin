import axios from 'axios';
import history from 'routes/history';
import {getAuth, handleLogout} from 'utils/auth/index';

const URL_API_GATEWAY = process.env.REACT_APP_API_URL_GATEWAY;

const axiosGateway = axios.create({
  baseURL: URL_API_GATEWAY,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosGateway;

axiosGateway.defaults.headers.Accept = 'application/json';
// Add a request interceptor
axiosGateway.interceptors.request.use(
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
axiosGateway.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response) {
      handleErrorApi(error?.response?.status);
    }
    return Promise.reject(error);
  }
);

const handleErrorApi = (status) => {
  switch (status) {
    case 401:
    case 403:
      handleLogout();
      break;

    case 500:
      history.replace('/500');
      break;
  }
};
