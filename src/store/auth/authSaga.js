import {call, delay, fork, put, takeLatest, all} from 'redux-saga/effects';
import {authActions} from './authSlice';
import {login} from '../../api/login';
import {alertActions} from 'store/alert/alertSlice';

function* handleLogin(action) {
  try {
    const response = yield call(login, action.payload);
    localStorage.setItem('access_token', JSON.stringify(response?.data?.id_token));

    yield put(authActions.loginSuccess({...action.payload}));

    action.payload.onNavigate?.();
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

function* handleLogout(action) {
  yield delay(500);
  localStorage.removeItem('access_token');

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
