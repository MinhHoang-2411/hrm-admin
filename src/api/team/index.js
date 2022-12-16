import axiosClient from '../axiosClient';

const teamApi = {
  getAll(params) {
    const url = '/teams';
    return axiosClient.get(url, {params});
  },
};

export default teamApi;
