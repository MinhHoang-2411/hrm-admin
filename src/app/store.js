import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from 'store/auth/authSlice';
import menuReducer from 'store/menu/menuSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {auth: authReducer, menu: menuReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
