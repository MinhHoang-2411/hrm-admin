import axiosClient from '../axiosClient';

const API_URL = process.env.REACT_APP_API_URL;

export const LOGIN_URL = `${API_URL}/admin/users`;

const userApi = {
  create(params) {
    return axiosClient.post(LOGIN_URL, params);
  },
};

export default userApi;
