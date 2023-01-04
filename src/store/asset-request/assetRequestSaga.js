import assetRequestApi from 'api/asset/request';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {alertActions} from 'store/alert/alertSlice';
import {assetRequestActions} from './assetRequestSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(assetRequestApi.getAll, params);

    yield put(assetRequestActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(assetRequestActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleGetListWaiting(action) {
  try {
    const params = action.payload;
    params['status.equals'] = 'WAITING';
    const response = yield call(assetRequestApi.getAll, params);

    yield put(assetRequestActions.getListWaitingSuccess(response));
  } catch (error) {
    yield put(assetRequestActions.getListWaitingFalse('An error occurred, please try again'));
  }
}

function* handleChangeStatus(action) {
  try {
    const params = action.payload;
    const reps = yield call(assetRequestApi.changeStatus, params);

    yield put(assetRequestActions.changeStatusSuccess(reps?.data));
    yield put(
      alertActions.showAlert({
        text: `Request has been ${params?.status}`,
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetRequestActions.changeStatusFalse('An error occurred, please try again'));
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
    yield call(assetRequestApi.remove, id);

    yield put(assetRequestActions.removeSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Remove assetRequest successfully',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetRequestActions.removeFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* assetRequestFlow() {
  yield all([
    takeLatest(assetRequestActions.fetchData.type, handleFetchData),
    takeLatest(assetRequestActions.getListWaiting.type, handleGetListWaiting),
    takeLatest(assetRequestActions.changeStatus.type, handleChangeStatus),
    takeLatest(assetRequestActions.remove.type, handleRemove),
  ]);
}

export function* assetRequestSaga() {
  yield fork(assetRequestFlow);
}
