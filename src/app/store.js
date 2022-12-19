import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import alertReducer from 'store/alert/alertSlice';
import assetReducer from 'store/asset/assetSlice';
import authReducer from 'store/auth/authSlice';
import branchesReducer from 'store/branches/branchesSlice';
import candidateReducer from 'store/candidate/candidateSlice';
import employeeReducer from 'store/employee/employeeSlice';
import leaveReducer from 'store/leave/leaveSlice';
import menuReducer from 'store/menu/menuSlice';
import modalReducer from 'store/modal/modalSlice';
import teamReducer from 'store/team/teamSlice';
import userReducer from 'store/user/userSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    employee: employeeReducer,
    team: teamReducer,
    branches: branchesReducer,
    asset: assetReducer,
    candidate: candidateReducer,
    alert: alertReducer,
    modal: modalReducer,
    user: userReducer,
    leave: leaveReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
