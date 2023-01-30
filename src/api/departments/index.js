import axiosClient from '../axiosClient';

const departmentsApi = {
  getAll(params) {
    const url = '/employees/departments';
    return axiosClient.get(url, {params});
  },
};

export default departmentsApi;
