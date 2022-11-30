import {all} from 'redux-saga/effects';
import {authSaga} from 'store/auth/authSaga';
import {menuSaga} from 'store/menu/menuSaga';

export default function* rootSaga() {
  yield all([authSaga(), menuSaga()]);
}
