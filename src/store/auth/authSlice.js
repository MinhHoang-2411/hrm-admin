import {createSlice} from '@reduxjs/toolkit';
import {INFO_USER_LOCAL_STORAGE_KEY} from 'constants/auth';

const initialState = {
  isLoggedIn: false, // logged
  logging: false, // loading
  dataUser: JSON.parse(localStorage.getItem(INFO_USER_LOCAL_STORAGE_KEY)) || {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.logging = true;
    },
    loginSuccess(state, action) {
      state.isLoggedIn = true;
      state.logging = false;
    },
    loginFailed(state, action) {
      state.logging = false;
    },
    getDataUser(state, action) {
      state.dataUser = action.payload;
    },

    logout(state, action) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLogging = (state) => state.auth.logging;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
