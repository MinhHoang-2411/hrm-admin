import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  loadingPending: false,
  loadMore: false,
  loadMorePending: false,
  loadingChangeStatus: false,
  loadingRemove: false,
  loadingDetail: false,
  reloadList: false,
  reloadListPending: false,
  listData: [],
  listDataPending: [],
  pagination: undefined,
  paginationPending: undefined,
  dataLeave: null,
};

const leaveSlice = createSlice({
  name: 'leave',
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

    // LEAVE PENDING
    getListPending(state, action) {
      state.loadingPending = true;
      state.paginationPending = {
        size: action.payload.size,
        page: action.payload.page,
      };
    },
    getListPendingSuccess(state, action) {
      state.loadingPending = false;
      state.listDataPending = action.payload.data;
      state.paginationPending = {
        ...state.pagination,
        totalCount: action?.payload?.headers?.['x-total-count'],
      };
    },
    getListPendingFalse(state, action) {
      state.loadingPending = false;
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

    //Get Data By Id
    getById(state, action) {
      state.loadingDetail = true;
    },
    getByIdSuccess(state, action) {
      state.dataLeave = action.payload;
      state.loadingDetail = false;
    },
    getByIdFalse(state, action) {
      console.error(action.payload);
      state.loadingDetail = false;
    },
    clearData(state, action) {
      state.dataLeave = null;
    },

    //Load more pending
    loadMorePending(state, action) {
      state.loadMorePending = true;
    },
    loadMorePendingSuccess(state, action) {
      state.listDataPending = [...state.listDataPending, ...action.payload.data];
      state.loadMorePending = false;
    },
    loadMorePendingFalse(state, action) {
      state.loadMorePending = false;
      console.error(action.payload);
    },

    //Load more
    loadMore(state, action) {
      state.loadMore = true;
    },
    loadMoreSuccess(state, action) {
      state.listData = [...state.listData, ...action.payload.data];
      state.loadMore = false;
    },
    loadMoreFalse(state, action) {
      state.loadMore = false;
      console.error(action.payload);
    },
  },
});

// Actions
export const leaveActions = leaveSlice.actions;

// Reducer
const leaveReducer = leaveSlice.reducer;
export default leaveReducer;
