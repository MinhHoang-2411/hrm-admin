import leaveApi from 'api/leave/index';
import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {menuActions} from './menuSlice';

function* handleGetCount(action) {
  try {
    const params = {};
    params['status.equals'] = 'CONFIRMED';
    const response = yield call(leaveApi.getAll, params);
    yield put(
      menuActions.getCountMenuSuccess({
        leave: response?.headers?.['x-total-count'] || 0,
        asset_request: 0,
      })
    );
  } catch (error) {
    yield put(menuActions.getCountMenuFalse('An error occurred, please try again'));
  }
}

function* watchMenuFlow() {
  yield all([takeLatest(menuActions.getCountMenu.type, handleGetCount)]);
}

export function* menuSaga() {
  yield fork(watchMenuFlow);
}
