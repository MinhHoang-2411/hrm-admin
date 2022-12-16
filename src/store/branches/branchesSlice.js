import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  reloadList: false,
  loadingCreate: false,
  listData: [],
  pagination: undefined,
};

const branchesSlice = createSlice({
  name: 'branches',
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
  },
});

// Actions
export const branchesActions = branchesSlice.actions;

// Reducer
const branchesReducer = branchesSlice.reducer;
export default branchesReducer;
