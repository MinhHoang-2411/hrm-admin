import axiosClient from '../axiosClient';

const assetRequestApi = {
  getAll(params) {
    const url = '/asset-requests';
    return axiosClient.get(url, {params});
  },
  changeStatus(params) {
    const url = `/asset-requests/${params.id}`;
    return axiosClient.patch(url, params);
  },
  remove(id) {
    const url = `/asset-requests/${id}`;
    return axiosClient.patch(url, {
      isDeleted: true,
    });
  },
};

export default assetRequestApi;
