import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loadingChangePwd: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    //fetch all accounts
    changePwd(state, action) {
      state.loadingChangePwd = true;
    },
    changePwdSuccess(state, action) {
      state.loadingChangePwd = false;
    },
    changePwdFalse(state, action) {
      console.error(action.payload);
      state.loadingChangePwd = false;
    },
  },
});

// Actions
export const settingsActions = settingsSlice.actions;

// Reducer
const settingsReducer = settingsSlice.reducer;
export default settingsReducer;
