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
  activateOrDeactivate(data) {
    const url = `/employee-users/${data.id}`;

    return axiosClient.put(url, {...data, activated: !data.activated});
  },
  resetPwd(data) {
    const url = `${process.env.REACT_APP_API_URL}/account/${data}/reset-password`;
    return axiosClient.post(url);
  },
};

export default accountApi;
