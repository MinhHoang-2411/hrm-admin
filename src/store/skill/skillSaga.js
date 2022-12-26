import skillApi from 'api/skill/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {alertActions} from 'store/alert/alertSlice';
import {skillActions} from './skillSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(skillApi.getAll, params);

    yield put(skillActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(skillActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleCreate(action) {
  try {
    const params = action.payload;
    yield call(skillApi.create, params);

    yield put(skillActions.createSuccess());

    yield put(
      alertActions.showAlert({
        text: 'Create successful skills',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(skillActions.createFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleEdit(action) {
  try {
    const params = action.payload;
    yield call(skillApi.edit, params);

    yield put(skillActions.editSuccess());

    yield put(
      alertActions.showAlert({
        text: 'Edit successful skills',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(skillActions.editFalse('An error occurred, please try again'));
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
    const reps = yield call(skillApi.getById, id);

    yield put(skillActions.getByIdSuccess(reps?.data));
  } catch (error) {
    yield put(skillActions.getByIdFalse('An error occurred, please try again'));
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
    yield call(skillApi.remove, id);

    yield put(skillActions.removeSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Remove skill successfully',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(skillActions.removeFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* skillFlow() {
  yield all([
    takeLatest(skillActions.fetchData.type, handleFetchData),
    takeLatest(skillActions.create.type, handleCreate),
    takeLatest(skillActions.edit.type, handleEdit),
    takeLatest(skillActions.getById.type, handleGetById),
    takeLatest(skillActions.remove.type, handleRemove),
  ]);
}

export function* skillSaga() {
  yield fork(skillFlow);
}
