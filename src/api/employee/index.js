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
  remove(params) {
    const url = `/employees`;
    return axiosClient.delete(url, {
      data: params,
    });
  },
  getBasicInfo() {
    const url = `/employees/basic-info`;
    return axiosClient.get(url);
  },
};

export default employeeApi;
