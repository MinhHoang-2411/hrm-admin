import teamApi from 'api/team/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {teamActions} from './teamSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(teamApi.getAll, params);

    yield put(teamActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(teamActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* teamFlow() {
  yield all([takeLatest(teamActions.fetchData.type, handleFetchData)]);
}

export function* teamSaga() {
  yield fork(teamFlow);
}
