import axiosClient from '../axiosClient';

const candidateApi = {
  getAll(params) {
    const url = '/candidates';
    return axiosClient.get(url, {params});
  },
  create(params) {
    const url = '/candidates';
    return axiosClient.post(url, params);
  },
  getById(id) {
    const url = `/candidates/${id}`;
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/candidates/${id}`;
    return axiosClient.patch(url, {
      isDeleted: true,
    });
  },
};

export default candidateApi;
