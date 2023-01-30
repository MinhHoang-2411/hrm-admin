import departmentsApi from 'api/departments/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {departmentsActions} from './departmentsSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(departmentsApi.getAll, params);

    yield put(departmentsActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(departmentsActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* departmentsFlow() {
  yield all([takeLatest(departmentsActions.fetchData.type, handleFetchData)]);
}

export function* departmentsSaga() {
  yield fork(departmentsFlow);
}
