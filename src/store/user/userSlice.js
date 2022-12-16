import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  reloadList: false,
  loadingCreate: false,
  loadingEdit: false,
  loadingRemove: false,
  listData: [],
  dataUser: null,
  pagination: undefined,
};

const userSlice = createSlice({
  name: 'user',
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
      state.listData = action.payload.data;
      state.pagination = {
        ...state.pagination,
        totalCount: action?.payload?.headers?.['x-total-count'],
      };
      state.loading = false;
    },
    fetchDataFalse(state, action) {
      console.error(action.payload);
      state.loading = false;
    },

    // Create user
    create(state, action) {
      state.loadingCreate = true;
    },
    createSuccess(state, action) {
      state.loadingCreate = false;
      state.reloadList = !state.reloadList;
    },
    createFalse(state, action) {
      state.loadingCreate = false;
      console.error(action.payload);
    },
  },
});

// Actions
export const userActions = userSlice.actions;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
