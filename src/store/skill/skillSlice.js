import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  reloadList: false,
  loadingCreate: false,
  loadingEdit: false,
  loadingRemove: false,
  listData: [],
  dataSkill: null,
  pagination: undefined,
};

const skillSlice = createSlice({
  name: 'skill',
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

    // Create
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

    // Edit
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

    // Get data by Id
    getById(state, action) {
      state.loadingEdit = true;
    },
    getByIdSuccess(state, action) {
      state.dataSkill = action.payload;
      state.loadingEdit = false;
    },
    getByIdFalse(state, action) {
      console.error(action.payload);
      state.loadingEdit = false;
    },
    clearData(state, action) {
      state.dataSkill = null;
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
export const skillActions = skillSlice.actions;

// Reducer
const skillReducer = skillSlice.reducer;
export default skillReducer;
