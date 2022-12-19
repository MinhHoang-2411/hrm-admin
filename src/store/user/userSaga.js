import userApi from 'api/user/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {alertActions} from 'store/alert/alertSlice';
import {userActions} from './userSlice';

function* handleCreate(action) {
  try {
    const params = action.payload;
    yield call(userApi.create, params);

    yield put(userActions.createSuccess());

    yield put(
      alertActions.showAlert({
        text: 'Create successful users',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(userActions.createFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* userFlow() {
  yield all([takeLatest(userActions.create.type, handleCreate)]);
}

export function* userSaga() {
  yield fork(userFlow);
}
