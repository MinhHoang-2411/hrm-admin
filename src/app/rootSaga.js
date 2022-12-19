import {all} from 'redux-saga/effects';
import {alertSaga} from 'store/alert/alertSaga';
import {assetSaga} from 'store/asset/assetSaga';
import {authSaga} from 'store/auth/authSaga';
import {branchesSaga} from 'store/branches/branchesSaga';
import {candidateSaga} from 'store/candidate/candidateSaga';
import {employeeSaga} from 'store/employee/employeeSaga';
import {leaveSaga} from 'store/leave/leaveSaga';
import {menuSaga} from 'store/menu/menuSaga';
import {teamSaga} from 'store/team/teamSaga';
import {userSaga} from 'store/user/userSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    menuSaga(),
    employeeSaga(),
    teamSaga(),
    branchesSaga(),
    assetSaga(),
    candidateSaga(),
    alertSaga(),
    userSaga(),
    leaveSaga(),
  ]);
}
