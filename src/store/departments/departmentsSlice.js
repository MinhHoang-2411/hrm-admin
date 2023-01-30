import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  reloadList: false,
  loadingCreate: false,
  listData: [],
  pagination: undefined,
};

const departmentsSlice = createSlice({
  name: 'departments',
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
export const departmentsActions = departmentsSlice.actions;

// Reducer
const departmentsReducer = departmentsSlice.reducer;
export default departmentsReducer;
