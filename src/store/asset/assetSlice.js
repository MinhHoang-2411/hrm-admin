import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  loadingModels: false,
  loadingCategory: false,
  loadingModelAsset: false,
  reloadListCategory: false,
  reloadListModel: false,
  reloadList: false,
  loadingDelete: false,
  loadingCreate: false,
  loadingEdit: false,
  listData: [],
  listModels: [],
  listModelsFilter: [],
  listCategory: [],
  listCategoryFilter: [],
  dataAsset: null,
  pagination: undefined,
};

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    fetchData(state, action) {
      state.loading = true;
      state.pagination = {
        size: action.payload.size,
        page: action.payload.page,
      };
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.listData = action.payload.data;
      state.pagination = {
        ...state.pagination,
        totalCount: action?.payload?.headers?.['x-total-count'],
      };
    },
    fetchDataFalse(state, action) {
      state.loading = false;
      console.error(action.payload);
    },
    getAssetById(state, action) {
      state.loadingModelAsset = true;
    },
    getAssetByIdSuccess(state, action) {
      state.dataAsset = action.payload.data;
      state.loadingModelAsset = false;
    },
    getAssetByIdFalse(state, action) {
      state.loadingModelAsset = false;
      console.error(action.payload);
    },

    // MODELS
    getModels(state, action) {
      state.loadingModels = true;
    },
    getModelsFilterSuccess(state, action) {
      state.loadingCategory = true;
      state.listModelsFilter = action.payload.data;
    },
    getModelsSuccess(state, action) {
      state.loadingModels = false;
      state.listModels = action.payload.data;
      state.listModelsFilter = action.payload.data;
    },
    getModelsFalse(state, action) {
      state.loadingModels = false;
      console.error(action.payload);
    },

    // CATEGORY
    getCategory(state, action) {
      state.loadingCategory = true;
    },
    getCategoryFilterSuccess(state, action) {
      state.loadingCategory = true;
      state.listCategoryFilter = action.payload.data;
    },
    getCategorySuccess(state, action) {
      state.loadingCategory = false;
      state.listCategory = action.payload.data;
      state.listCategoryFilter = action.payload.data;
    },
    getCategoryFalse(state, action) {
      state.loadingCategory = false;
      console.error(action.payload);
    },

    //CREATE
    createCategory(state, action) {
      state.loadingCreate = true;
    },
    createCategorySuccess(state, action) {
      state.loadingCreate = false;
      state.reloadListCategory = !state.reloadListCategory;
    },
    createCategoryFalse(state, action) {
      state.loadingCreate = false;
      console.error(action.payload);
    },

    createModel(state, action) {
      state.loadingCreate = true;
    },
    createModelSuccess(state, action) {
      state.loadingCreate = false;
      state.reloadListModel = !state.reloadListModel;
    },
    createModelFalse(state, action) {
      state.loadingCreate = false;
      console.error(action.payload);
    },

    createAsset(state, action) {
      state.loadingCreate = true;
    },
    createAssetSuccess(state, action) {
      state.loadingCreate = false;
      state.reloadList = !state.reloadList;
    },
    createAssetFalse(state, action) {
      state.loadingCreate = false;
      console.error(action.payload);
    },

    //EDIT
    editCategory(state, action) {
      state.loadingEdit = true;
    },
    editCategorySuccess(state, action) {
      state.loadingEdit = false;
      state.reloadListCategory = !state.reloadListCategory;
    },
    editCategoryFalse(state, action) {
      state.loadingEdit = false;
      console.error(action.payload);
    },

    editModel(state, action) {
      state.loadingEdit = true;
    },
    editModelSuccess(state, action) {
      state.loadingEdit = false;
      state.reloadListModel = !state.reloadListModel;
    },
    editModelFalse(state, action) {
      state.loadingEdit = false;
      console.error(action.payload);
    },

    editAsset(state, action) {
      state.loadingEdit = true;
    },
    editAssetSuccess(state, action) {
      state.loadingEdit = false;
      state.reloadList = !state.reloadList;
    },
    editAssetFalse(state, action) {
      state.loadingEdit = false;
      console.error(action.payload);
    },

    //DELETE
    deleteAsset(state, action) {
      state.loadingDelete = true;
    },
    deleteAssetSuccess(state, action) {
      state.loadingDelete = false;
      state.reloadList = !state.reloadList;
    },
    deleteAssetFalse(state, action) {
      state.loadingDelete = false;
      console.error(action.payload);
    },

    deleteCategory(state, action) {
      state.loadingDelete = true;
    },
    deleteCategorySuccess(state, action) {
      state.loadingDelete = false;
      state.reloadListCategory = !state.reloadListCategory;
    },
    deleteCategoryFalse(state, action) {
      state.loadingDelete = false;
      console.error(action.payload);
    },

    deleteModel(state, action) {
      state.loadingDelete = true;
    },
    deleteModelSuccess(state, action) {
      state.loadingDelete = false;
      state.reloadListModel = !state.reloadListModel;
    },
    deleteModelFalse(state, action) {
      state.loadingDelete = false;
      console.error(action.payload);
    },
  },
});

// Actions
export const assetActions = assetSlice.actions;

// Reducer
const assetReducer = assetSlice.reducer;
export default assetReducer;
