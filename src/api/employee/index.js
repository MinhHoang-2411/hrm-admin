import axiosClient from '../axiosClient';

const employeeApi = {
  getAll(params) {
    const url = '/employees';
    return axiosClient.get(url, {params});
  },
  create(params) {
    const url = '/employees';
    return axiosClient.post(url, params);
  },
  edit(params) {
    const url = `/employees/${params?.id}`;
    return axiosClient.patch(url, params);
  },
  getById(id) {
    const url = `/employees/${id}`;
    return axiosClient.get(url);
  },
  remove(id) {
    const url = `/employees/${id}`;
    return axiosClient.patch(url, {
      isDeleted: true,
    });
  },
};

export default employeeApi;
