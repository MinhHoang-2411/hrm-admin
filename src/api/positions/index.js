import axiosClient from '../axiosClient';

const positionsApi = {
  getAll(params) {
    const url = '/employees/positions';
    return axiosClient.get(url, {params});
  },
};

export default positionsApi;
