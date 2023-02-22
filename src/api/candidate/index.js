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
  edit(params) {
    const url = `/candidates/${params.id}`;
    return axiosClient.patch(url, params);
  },
  getById(id) {
    const url = `/candidates/${id}`;
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/candidates/${id}`;
    return axiosClient.delete(url);
  },
};

export default candidateApi;
