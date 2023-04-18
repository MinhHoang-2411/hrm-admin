import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  reloadList: false,
  loadingCreate: false,
  loadingEdit: false,
  loadingActivateOrDeactivate: false,
  listData: [],
  dataAccount: null,
  pagination: undefined,
  loadingResetPwd: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    //fetch all accounts
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

    // Create account
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

    // Get an account by Id
    getById(state, action) {
      state.loadingEdit = true;
    },
    getByIdSuccess(state, action) {
      state.dataAccount = action.payload;
      state.loadingEdit = false;
    },
    getByIdFalse(state, action) {
      console.error(action.payload);
      state.loadingEdit = false;
    },
    clearData(state, action) {
      state.dataAccount = null;
    },

    // Edit an Account
    changePassword(state, action) {
      state.loadingEdit = true;
    },
    changePasswordSuccess(state, action) {
      state.loadingEdit = false;
    },
    changePasswordFalse(state, action) {
      state.loadingEdit = false;
      console.error(action.payload);
    },

    //Activate or Deactivate an Account
    activateOrDeactivate(state, action) {
      state.loadingActivateOrDeactivate = true;
    },
    activateOrDeactivateSuccess(state, action) {
      state.loadingActivateOrDeactivate = false;
      state.reloadList = !state.reloadList;
    },
    activateOrDeactivateFalse(state, action) {
      state.loadingActivateOrDeactivate = false;
      console.error(action.payload);
    },

    //Reset Password
    resetPwd(state, action) {
      state.loadingResetPwd = true;
    },
    resetPwdSuccess(state, action) {
      state.loadingResetPwd = false;
      state.reloadList = !state.reloadList;
    },
    resetPwdFail(state, action) {
      state.loadingResetPwd = false;
      console.error(action.payload);
    },
  },
});

// Actions
export const accountActions = accountSlice.actions;

// Reducer
const accountReducer = accountSlice.reducer;
export default accountReducer;
