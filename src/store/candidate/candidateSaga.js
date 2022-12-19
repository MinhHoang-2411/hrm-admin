import candidateApi from 'api/candidate/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {alertActions} from 'store/alert/alertSlice';
import {candidateActions} from './candidateSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(candidateApi.getAll, params);

    yield put(candidateActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(candidateActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleCreate(action) {
  try {
    const params = action.payload;
    yield call(candidateApi.create, params);

    yield put(candidateActions.createSuccess());

    yield put(
      alertActions.showAlert({
        text: 'Create successful candidates',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(candidateActions.createFalse('An error occurred, please try again'));
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
    const reps = yield call(candidateApi.getById, id);

    yield put(candidateActions.getByIdSuccess(reps?.data));
  } catch (error) {
    yield put(candidateActions.getByIdFalse('An error occurred, please try again'));
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
    yield call(candidateApi.remove, id);

    yield put(candidateActions.removeSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Remove candidate successfully',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(candidateActions.removeFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* candidateFlow() {
  yield all([
    takeLatest(candidateActions.fetchData.type, handleFetchData),
    takeLatest(candidateActions.create.type, handleCreate),
    takeLatest(candidateActions.getById.type, handleGetById),
    takeLatest(candidateActions.remove.type, handleRemove),
  ]);
}

export function* candidateSaga() {
  yield fork(candidateFlow);
}
