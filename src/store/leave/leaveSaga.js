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

function* handleGetById(action) {
  try {
    const id = action.payload;
    const reps = yield call(leaveApi.getById, id);

    yield put(leaveActions.getByIdSuccess(reps?.data));
  } catch (error) {
    yield put(leaveActions.getByIdFalse('An error occurred, please try again'));
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
    takeLatest(leaveActions.getById.type, handleGetById),
    takeLatest(leaveActions.remove.type, handleRemove),
  ]);
}

export function* leaveSaga() {
  yield fork(leaveFlow);
}
