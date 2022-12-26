import branchesApi from 'api/branches/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {branchesActions} from './branchesSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(branchesApi.getAll, params);

    yield put(branchesActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(branchesActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* branchesFlow() {
  yield all([takeLatest(branchesActions.fetchData.type, handleFetchData)]);
}

export function* branchesSaga() {
  yield fork(branchesFlow);
}
