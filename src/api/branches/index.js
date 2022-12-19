import axiosClient from '../axiosClient';

const branchesApi = {
  getAll(params) {
    const url = '/branches';
    return axiosClient.get(url, {params});
  },
};

export default branchesApi;
