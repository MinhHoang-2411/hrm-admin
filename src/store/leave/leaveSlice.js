import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  reloadList: false,
  loadingGetById: false,
  loadingRemove: false,
  listData: [],
  dataLeave: null,
  pagination: undefined,
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

    // Get data by Id
    getById(state, action) {
      state.loadingGetById = true;
    },
    getByIdSuccess(state, action) {
      state.dataLeave = action.payload;
      state.loadingGetById = false;
    },
    getByIdFalse(state, action) {
      console.error(action.payload);
      state.loadingGetById = false;
    },
    clearData(state, action) {
      state.dataLeave = null;
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
export const leaveActions = leaveSlice.actions;

// Reducer
const leaveReducer = leaveSlice.reducer;
export default leaveReducer;
