import axiosClient from '../axiosClient';

const assetApi = {
  getAll(params) {
    const url = '/assets';
    return axiosClient.get(url, {params});
  },
  getModels(params) {
    const url = '/asset-models';
    return axiosClient.get(url, {params});
  },
  getCategory(params) {
    const url = '/asset-categories';
    return axiosClient.get(url, {params});
  },
  getAssetById(id) {
    const url = `/assets/${id}`;
    return axiosClient.get(url);
  },

  //create
  createCategory(params) {
    const url = '/asset-categories';
    return axiosClient.post(url, params);
  },
  createModel(params) {
    const url = '/asset-models';
    return axiosClient.post(url, params);
  },
  createAsset(params) {
    const url = '/assets';
    return axiosClient.post(url, params);
  },

  //edit
  editCategory(params) {
    const url = `/asset-categories/${params?.id}`;
    return axiosClient.patch(url, params);
  },
  editModel(params) {
    const url = `/asset-models/${params?.id}`;
    return axiosClient.patch(url, params);
  },
  editAsset(params) {
    const url = `/assets/${params?.id}`;
    return axiosClient.patch(url, params);
  },

  //delete
  deleteAsset(id) {
    const url = `/assets/${id}`;
    return axiosClient.delete(url);
  },
  deleteModel(id) {
    const url = `/asset-models/${id}`;
    return axiosClient.delete(url);
  },
  deleteCategory(id) {
    const url = `/asset-categories/${id}`;
    return axiosClient.delete(url);
  },
};

export default assetApi;
