import settingsApi from 'api/settings/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {alertActions} from 'store/alert/alertSlice';
import {settingsActions} from './settingsSlice';
function* handleChangePwd(action) {
  try {
    const params = action.payload;
    const response = yield call(settingsApi.changePwd, params);

    yield put(settingsActions.changePwdSuccess(response));
    yield put(
      alertActions.showAlert({
        text: 'Change Password Successfully',
        type: 'success',
      })
    );
  } catch (error) {
    console.log({error: error?.response?.status});
    yield put(
      settingsActions.changePwdFalse(
        error?.response?.data?.title || 'An error occurred, please try again'
      )
    );
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.title || 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* settingsFlow() {
  yield all([takeLatest(settingsActions.changePwd.type, handleChangePwd)]);
}
export function* settingsSaga() {
  yield fork(settingsFlow);
}
