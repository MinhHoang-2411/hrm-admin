import axiosClient from '../axiosClient';

const leaveApi = {
  getAll(params) {
    const url = '/leaves';
    return axiosClient.get(url, {params});
  },
  getById(id) {
    const url = `/leaves/${id}`;
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/leaves/${id}`;
    return axiosClient.patch(url, {
      isDeleted: true,
    });
  },
};

export default leaveApi;
