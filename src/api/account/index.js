import axiosClient from '../axiosClient';

const accountApi = {
  getAll(params) {
    const url = '/employee-users';
    return axiosClient.get(url, {params});
  },
  create(params) {
    const url = '/employee-users';
    return axiosClient.post(url, params);
  },
  edit(params) {
    const url = `/employee-users/${params?.id}`;
    return axiosClient.patch(url, params);
  },
  getById(id) {
    const url = `/employee-users/${id}`;
    return axiosClient.get(url);
  },
  activateOrDeactivate(id, activated) {
    const url = `/employee-users/${id}`;

    return axiosClient.patch(url, {activated: !activated});
  },
};

export default accountApi;
