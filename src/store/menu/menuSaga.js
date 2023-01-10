import leaveApi from 'api/leave/index';
import {fork, put, take, call} from 'redux-saga/effects';
import {menuActions} from './menuSlice';

function* handleActiveItem(payload) {
  yield put(menuActions.activeItem(payload));
}

function* handleActiveComponent(payload) {
  yield put(menuActions.activeComponent(payload));
}

function* handleOpenDrawer(payload) {
  yield put(menuActions.openDrawer(payload));
}
function* handleOpenComponentDrawer(payload) {
  yield put(menuActions.actionOpenComponentDrawer(payload));
}

function* handleGetCount(payload) {
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
  while (true) {
    const actionCount = yield take(menuActions.getCountMenu.type);
    yield fork(handleGetCount, actionCount.payload);

    const action = yield take(menuActions.activeItem.type);
    yield fork(handleActiveItem, action.payload);

    const actionComponent = yield take(menuActions.activeComponent.type);
    yield fork(handleActiveComponent, actionComponent.payload);

    const actionOpenDrawer = yield take(menuActions.openDrawer.type);
    yield fork(handleOpenDrawer, actionOpenDrawer.payload);

    const actionOpenComponentDrawer = yield take(menuActions.openComponentDrawer.type);
    yield fork(handleOpenComponentDrawer, actionOpenComponentDrawer.payload);
  }
}

export function* menuSaga() {
  yield fork(watchMenuFlow);
}
