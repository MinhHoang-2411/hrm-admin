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
import skillReducer from 'store/skill/skillSlice';
import teamReducer from 'store/team/teamSlice';
import userReducer from 'store/user/userSlice';
import accountReducer from 'store/account/accountSlice';
import rootSaga from './rootSaga';
import assetRequestReducer from 'store/asset-request/assetRequestSlice';
import positionsReducer from 'store/positions/positionsSlice';
import departmentsReducer from 'store/departments/departmentsSlice';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    employee: employeeReducer,
    team: teamReducer,
    branches: branchesReducer,
    positions: positionsReducer,
    departments: departmentsReducer,
    asset: assetReducer,
    assetRequest: assetRequestReducer,
    candidate: candidateReducer,
    alert: alertReducer,
    modal: modalReducer,
    user: userReducer,
    account: accountReducer,
    leave: leaveReducer,
    skill: skillReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
