import employeeApi from 'api/employee/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {accountActions} from 'store/account/accountSlice';
import {alertActions} from 'store/alert/alertSlice';
import {employeeActions} from './employeeSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(employeeApi.getAll, params);

    yield put(employeeActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(employeeActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleCreate(action) {
  try {
    const params = action.payload.params;
    yield call(employeeApi.create, params);

    yield put(employeeActions.createSuccess());

    yield put(
      alertActions.showAlert({
        text: 'Create successful employees',
        type: 'success',
      })
    );

    action.payload?.handleClose?.();
  } catch (error) {
    yield put(employeeActions.createFalse(error));
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.title || 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleEdit(action) {
  try {
    const params = action.payload.params;
    yield call(employeeApi.edit, params);

    yield put(employeeActions.editSuccess());

    yield put(
      alertActions.showAlert({
        text: 'Update successful employees',
        type: 'success',
      })
    );

    action.payload?.handleClose?.();
  } catch (error) {
    yield put(employeeActions.createFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: error?.response?.data?.title || 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleGetById(action) {
  try {
    const params = action.payload;
    const reps = yield call(employeeApi.getById, params);

    yield put(employeeActions.getByIdSuccess(reps?.data));
  } catch (error) {
    yield put(employeeActions.getByIdFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: `This account's employee information could not be obtained, please try again`,
        type: 'error',
      })
    );
  }
}

function* handleRemove(action) {
  try {
    const id = action.payload.id;
    yield call(employeeApi.remove, [id]);

    yield put(employeeActions.removeSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Remove employee successfully',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(employeeActions.removeFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* employeeFlow() {
  yield all([
    takeLatest(employeeActions.fetchData.type, handleFetchData),
    takeLatest(employeeActions.create.type, handleCreate),
    takeLatest(employeeActions.getById.type, handleGetById),
    takeLatest(employeeActions.edit.type, handleEdit),
    takeLatest(employeeActions.remove.type, handleRemove),
  ]);
}

export function* employeeSaga() {
  yield fork(employeeFlow);
}
