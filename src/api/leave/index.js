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
  getById(id) {
    const url = `/leaves/${id}`;
    return axiosClient.get(url);
  },
  getDetail(params) {
    const url = `/leave-details`;
    return axiosClient.get(url, {params});
  },
};

export default leaveApi;
