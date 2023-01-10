import leaveApi from 'api/leave/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {alertActions} from 'store/alert/alertSlice';
import {menuActions} from 'store/menu/menuSlice';
import {leaveActions} from './leaveSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    params['status.notEquals'] = 'CONFIRMED';
    const response = yield call(leaveApi.getAll, params);

    yield put(leaveActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(leaveActions.fetchDataFalse('An error occurred, please try again'));
  }
}
function* handleLoadMorePending(action) {
  try {
    const params = action.payload;
    params['status.equals'] = 'CONFIRMED';
    const response = yield call(leaveApi.getAll, params);

    yield put(leaveActions.loadMorePendingSuccess(response));
  } catch (error) {
    yield put(leaveActions.loadMorePendingFalse('An error occurred, please try again'));
  }
}

function* handleLoadMore(action) {
  try {
    const params = action.payload;
    params['status.notEquals'] = 'CONFIRMED';
    const response = yield call(leaveApi.getAll, params);

    yield put(leaveActions.loadMoreSuccess(response));
  } catch (error) {
    yield put(leaveActions.loadMorePendingFalse('An error occurred, please try again'));
  }
}

function* handleGetListPending(action) {
  try {
    const params = action.payload;
    params['status.equals'] = 'CONFIRMED';
    const response = yield call(leaveApi.getAll, params);

    yield put(leaveActions.getListPendingSuccess(response));
  } catch (error) {
    yield put(leaveActions.getListPendingFalse('An error occurred, please try again'));
  }
}

function* handleChangeStatus(action) {
  try {
    const params = action.payload;
    const reps = yield call(leaveApi.changeStatus, params);

    yield put(leaveActions.changeStatusSuccess(reps?.data));
    yield put(menuActions.minusCountMenu('leave'));
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

function* handleGetById(action) {
  try {
    const id = action.payload;
    const params = {};
    params['leaveId.equals'] = id;
    const reps = yield call(leaveApi.getById, id);
    const detail = yield call(leaveApi.getDetail, params);

    yield put(leaveActions.getByIdSuccess({...reps?.data, detail: detail?.data || []}));
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

function* leaveFlow() {
  yield all([
    takeLatest(leaveActions.fetchData.type, handleFetchData),
    takeLatest(leaveActions.getListPending.type, handleGetListPending),
    takeLatest(leaveActions.changeStatus.type, handleChangeStatus),
    takeLatest(leaveActions.remove.type, handleRemove),
    takeLatest(leaveActions.getById.type, handleGetById),
    takeLatest(leaveActions.loadMorePending.type, handleLoadMorePending),
    takeLatest(leaveActions.loadMore.type, handleLoadMore),
  ]);
}

export function* leaveSaga() {
  yield fork(leaveFlow);
}
