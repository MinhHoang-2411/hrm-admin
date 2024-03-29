import accountApi from 'api/account/index';
import userApi from 'api/user/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {alertActions} from 'store/alert/alertSlice';
import {accountActions} from './accountSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(accountApi.getAll, params);

    yield put(accountActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(accountActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleCreate(action) {
  try {
    const paramsUser = action.payload.userParams;
    const response = yield call(userApi.create, paramsUser);

    const params = {
      ...action.payload.params,
      user: {...action.payload.params.user, id: response.data.id},
    };
    yield call(accountApi.create, params);

    yield put(accountActions.createSuccess());

    yield put(
      alertActions.showAlert({
        text: 'Create account successfully',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(accountActions.createFalse('An error occurred, please try again'));
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
    yield call(accountApi.edit, params);

    yield put(accountActions.editSuccess());

    yield put(
      alertActions.showAlert({
        text: 'Update account successfully',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(accountActions.createFalse('An error occurred, please try again'));
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
    const params = action.payload;
    const reps = yield call(accountApi.getById, params);

    yield put(accountActions.getByIdSuccess(reps?.data));
  } catch (error) {
    yield put(accountActions.getByIdFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleActivateOrDeactivate(action) {
  try {
    yield call(accountApi.activateOrDeactivate, action.payload);

    yield put(accountActions.activateOrDeactivateSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Change status successfully',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(accountActions.activateOrDeactivateFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleResetPwd(action) {
  try {
    yield call(accountApi.resetPwd, action.payload.id);

    yield put(accountActions.resetPwdSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Reset password successfully',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(accountActions.resetPwdFail('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* accountFlow() {
  yield all([
    takeLatest(accountActions.fetchData.type, handleFetchData),
    takeLatest(accountActions.create.type, handleCreate),
    takeLatest(accountActions.getById.type, handleGetById),
    takeLatest(accountActions.activateOrDeactivate.type, handleActivateOrDeactivate),
    takeLatest(accountActions.resetPwd.type, handleResetPwd),
  ]);
}

export function* accountSaga() {
  yield fork(accountFlow);
}
