import axiosClient from '../axiosClient';

const skillApi = {
  getAll(params) {
    const url = '/skills';
    return axiosClient.get(url, {params});
  },
  create(params) {
    const url = '/skills';
    return axiosClient.post(url, params);
  },
  edit(params) {
    const url = `/skills/${params?.id}`;
    return axiosClient.patch(url, params);
  },
  getById(id) {
    const url = `/skills/${id}`;
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/skills/${id}`;
    return axiosClient.delete(url);
  },
};

export default skillApi;
