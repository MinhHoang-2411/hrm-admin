import {call, delay, fork, put, takeLatest, all} from 'redux-saga/effects';
import {authActions} from './authSlice';
import {login} from '../../api/login';
import {alertActions} from 'store/alert/alertSlice';
import employeeApi from 'api/employee/index';
import {AUTH_LOCAL_STORAGE_KEY, INFO_USER_LOCAL_STORAGE_KEY} from 'constants/auth';

function* handleLogin(action) {
  try {
    const response = yield call(login, action.payload);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, JSON.stringify(response?.data?.id_token));

    action.payload.onNavigate?.();

    yield put(authActions.loginSuccess());

    yield call(getBasicInfo);
  } catch (error) {
    yield put(authActions.loginFailed(error));
    yield put(
      alertActions.showAlert({
        text: 'The username or password you entered did not match our records. Please try again.',
        type: 'error',
      })
    );
  }
}

function* getBasicInfo() {
  try {
    const user = yield call(employeeApi.getBasicInfo);
    localStorage.setItem(INFO_USER_LOCAL_STORAGE_KEY, JSON.stringify(user?.data));
    yield put(authActions.getDataUser(user?.data));
  } catch (error) {
    yield put(
      alertActions.showAlert({
        text: 'An error occurred while retrieving login information. Please try again.',
        type: 'error',
      })
    );
  }
}

function* handleLogout(action) {
  yield delay(500);
  localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  localStorage.removeItem(INFO_USER_LOCAL_STORAGE_KEY);

  action.payload.onNavigate?.();
}

function* watchLoginFlow() {
  yield all([
    takeLatest(authActions.login.type, handleLogin),
    takeLatest(authActions.logout.type, handleLogout),
  ]);
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
