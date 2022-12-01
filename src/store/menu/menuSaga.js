import {fork, put, take} from 'redux-saga/effects';
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

function* watchMenuFlow() {
  while (true) {
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
