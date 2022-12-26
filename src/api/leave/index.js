import axiosClient from '../axiosClient';

const leaveApi = {
  getAll(params) {
    const url = '/leaves';
    return axiosClient.get(url, {params});
  },
  changeStatus(params) {
    const url = `/leaves/${params.id}`;
    return axiosClient.patch(url, params);
  },
  remove(id) {
    const url = `/leaves/${id}`;
    return axiosClient.patch(url, {
      isDeleted: true,
    });
  },
};

export default leaveApi;
