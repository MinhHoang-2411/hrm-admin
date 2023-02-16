import axiosGateway from 'api/axiosGateway';

const settings = {
  changePwd(params) {
    const url = '/account/change-password';
    return axiosGateway.post(url, params);
  },
};

export default settings;
