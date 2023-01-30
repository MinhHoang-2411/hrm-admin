import positionsApi from 'api/positions/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {positionsActions} from './positionsSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(positionsApi.getAll, params);

    yield put(positionsActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(positionsActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* positionsFlow() {
  yield all([takeLatest(positionsActions.fetchData.type, handleFetchData)]);
}

export function* positionsSaga() {
  yield fork(positionsFlow);
}
