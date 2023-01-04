import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  loadingWaiting: false,
  loadingChangeStatus: false,
  loadingRemove: false,
  reloadList: false,
  reloadListWaiting: false,
  listData: [],
  listDataWaiting: [],
  pagination: undefined,
  paginationWaiting: undefined,
};

const assetRequestSlice = createSlice({
  name: 'assetRequest',
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

    // REQUEST WAITING
    getListWaiting(state, action) {
      state.loadingWaiting = true;
      state.paginationWaiting = {
        size: action.payload.size,
        page: action.payload.page,
      };
    },
    getListWaitingSuccess(state, action) {
      state.loadingWaiting = false;
      state.listDataWaiting = action.payload.data;
      state.paginationWaiting = {
        ...state.pagination,
        totalCount: action?.payload?.headers?.['x-total-count'],
      };
    },
    getListWaitingFalse(state, action) {
      state.loadingWaiting = false;
      console.error(action.payload);
    },

    // CHANGE STATUS
    changeStatus(state, action) {
      state.loadingChangeStatus = true;
    },
    changeStatusSuccess(state, action) {
      state.loadingChangeStatus = false;
      state.reloadList = !state.reloadList;
    },
    changeStatusFalse(state, action) {
      state.loadingChangeStatus = false;
    },

    //Remove
    remove(state, action) {
      state.loadingRemove = true;
    },
    removeSuccess(state, action) {
      state.loadingRemove = false;
      state.reloadList = !state.reloadList;
    },
    removeFalse(state, action) {
      state.loadingRemove = false;
      console.error(action.payload);
    },
  },
});

// Actions
export const assetRequestActions = assetRequestSlice.actions;

// Reducer
const assetRequestReducer = assetRequestSlice.reducer;
export default assetRequestReducer;
