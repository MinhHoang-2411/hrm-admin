import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  reloadList: false,
  loadingCreate: false,
  loadingEdit: false,
  loadingRemove: false,
  listData: [],
  dataEmployee: null,
  pagination: undefined,
  openModal: false,
};

const employeeSlice = createSlice({
  name: 'employee',
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

    // Create employee
    create(state, action) {
      state.loadingCreate = true;
    },
    createSuccess(state, action) {
      state.loadingCreate = false;
      state.reloadList = !state.reloadList;
    },
    createFalse(state, action) {
      state.loadingCreate = false;
      console.error({error: action.payload});
    },

    // Get data by Id
    getById(state, action) {
      state.loadingEdit = true;
    },
    getByIdSuccess(state, action) {
      state.dataEmployee = action.payload;
      state.loadingEdit = false;
    },
    getByIdFalse(state, action) {
      console.error(action.payload);
      state.loadingEdit = false;
    },
    clearData(state, action) {
      state.dataEmployee = null;
    },

    // Edit employee
    edit(state, action) {
      state.loadingEdit = true;
    },
    editSuccess(state, action) {
      state.loadingEdit = false;
      state.reloadList = !state.reloadList;
    },
    editFalse(state, action) {
      state.loadingEdit = false;
      console.error(action.payload);
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
  extraReducers: {
    ['openEmployeeModal']: (state) => {
      state.openModal = true;
    },
  },
});

// Actions
export const employeeActions = employeeSlice.actions;

// Reducer
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
