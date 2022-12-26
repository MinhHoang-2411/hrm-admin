import leaveApi from 'api/leave/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {alertActions} from 'store/alert/alertSlice';
import {leaveActions} from './leaveSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(leaveApi.getAll, params);

    yield put(leaveActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(leaveActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleGetListWaiting(action) {
  try {
    const params = action.payload;
    params['status.equals'] = 'WAITING';
    const response = yield call(leaveApi.getAll, params);

    yield put(leaveActions.getListWaitingSuccess(response));
  } catch (error) {
    yield put(leaveActions.getListWaitingFalse('An error occurred, please try again'));
  }
}

function* handleChangeStatus(action) {
  try {
    const params = action.payload;
    const reps = yield call(leaveApi.changeStatus, params);

    yield put(leaveActions.changeStatusSuccess(reps?.data));
    yield put(
      alertActions.showAlert({
        text: `Leave has been ${params?.status}`,
        type: 'success',
      })
    );
  } catch (error) {
    yield put(leaveActions.changeStatusFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleRemove(action) {
  try {
    const id = action.payload;
    yield call(leaveApi.remove, id);

    yield put(leaveActions.removeSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Remove leave successfully',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(leaveActions.removeFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* leaveFlow() {
  yield all([
    takeLatest(leaveActions.fetchData.type, handleFetchData),
    takeLatest(leaveActions.getListWaiting.type, handleGetListWaiting),
    takeLatest(leaveActions.changeStatus.type, handleChangeStatus),
    takeLatest(leaveActions.remove.type, handleRemove),
  ]);
}

export function* leaveSaga() {
  yield fork(leaveFlow);
}
