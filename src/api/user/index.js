import axiosClient from '../axiosClient';

const API_URL = process.env.REACT_APP_API_URL;

export const CREATE_ACCOUNT_URL = `${API_URL}/admin/users`;

const userApi = {
  create(params) {
    return axiosClient.post(CREATE_ACCOUNT_URL, params);
  },
};

export default userApi;
