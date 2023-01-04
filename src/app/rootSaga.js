import {all} from 'redux-saga/effects';
import {alertSaga} from 'store/alert/alertSaga';
import {assetSaga} from 'store/asset/assetSaga';
import {assetRequestSaga} from 'store/asset-request/assetRequestSaga';
import {authSaga} from 'store/auth/authSaga';
import {branchesSaga} from 'store/branches/branchesSaga';
import {candidateSaga} from 'store/candidate/candidateSaga';
import {employeeSaga} from 'store/employee/employeeSaga';
import {leaveSaga} from 'store/leave/leaveSaga';
import {menuSaga} from 'store/menu/menuSaga';
import {skillSaga} from 'store/skill/skillSaga';
import {teamSaga} from 'store/team/teamSaga';
import {userSaga} from 'store/user/userSaga';
import {accountSaga} from 'store/account/accountSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    menuSaga(),
    employeeSaga(),
    teamSaga(),
    branchesSaga(),
    assetSaga(),
    assetRequestSaga(),
    candidateSaga(),
    alertSaga(),
    userSaga(),
    accountSaga(),
    leaveSaga(),
    skillSaga(),
  ]);
}
