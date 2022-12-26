import assetApi from 'api/asset/index';
import {all, call, fork, put, takeLatest, takeEvery} from 'redux-saga/effects';
import {alertActions} from 'store/alert/alertSlice';
import {assetActions} from './assetSlice';

function* handleFetchData(action) {
  try {
    const params = action.payload;
    const response = yield call(assetApi.getAll, params);

    yield put(assetActions.fetchDataSuccess(response));
  } catch (error) {
    yield put(assetActions.fetchDataFalse('An error occurred, please try again'));
  }
}

function* handleGetAssetById(action) {
  try {
    const id = action.payload;
    const response = yield call(assetApi.getAssetById, id);

    yield put(assetActions.getAssetByIdSuccess(response));
  } catch (error) {
    yield put(assetActions.getAssetByIdFalse('An error occurred, please try again'));
  }
}

function* handleGetModels(action) {
  try {
    const params = action.payload;
    const response = yield call(assetApi.getModels, params);

    if (params?.typeGet == 'all') yield put(assetActions.getModelsFilterSuccess(response));
    else yield put(assetActions.getModelsSuccess(response));
  } catch (error) {
    yield put(assetActions.getModelsFalse('An error occurred, please try again'));
  }
}

function* handleGetCategory(action) {
  try {
    const params = action.payload;
    const response = yield call(assetApi.getCategory, params);

    if (params?.typeGet == 'all') yield put(assetActions.getCategoryFilterSuccess(response));
    else yield put(assetActions.getCategorySuccess(response));
  } catch (error) {
    yield put(assetActions.getCategoryFalse('An error occurred, please try again'));
  }
}

function* handleCreateCategory(action) {
  try {
    const params = action.payload;
    yield call(assetApi.createCategory, params);

    yield put(assetActions.createCategorySuccess());
    yield put(
      alertActions.showAlert({
        text: 'Create successful asset category',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetActions.createCategoryFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleEditCategory(action) {
  try {
    const params = action.payload;
    yield call(assetApi.editCategory, params);

    yield put(assetActions.editCategorySuccess());
    yield put(
      alertActions.showAlert({
        text: 'Edit successful asset category',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetActions.editCategoryFalse());
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleCreateModel(action) {
  try {
    const params = action.payload;
    yield call(assetApi.createModel, params);

    yield put(assetActions.createModelSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Create successful asset model',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetActions.createModelFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleEditModel(action) {
  try {
    const params = action.payload;
    yield call(assetApi.editModel, params);

    yield put(assetActions.editModelSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Edit successful asset model',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetActions.editModelFalse());
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleCreateAsset(action) {
  try {
    const params = action.payload;
    yield call(assetApi.createAsset, params);

    yield put(assetActions.createAssetSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Create successful asset',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetActions.createAssetFalse('An error occurred, please try again'));
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleEditAsset(action) {
  try {
    const params = action.payload;
    yield call(assetApi.editAsset, params);

    yield put(assetActions.editAssetSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Edit successful asset',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetActions.editAssetFalse());
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleDeleteAsset(action) {
  try {
    const id = action.payload;
    yield call(assetApi.deleteAsset, id);

    yield put(assetActions.deleteAssetSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Delete successful asset',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetActions.deleteAssetFalse());
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleDeleteCategoty(action) {
  try {
    const id = action.payload;
    yield call(assetApi.deleteCategory, id);

    yield put(assetActions.deleteCategorySuccess());
    yield put(
      alertActions.showAlert({
        text: 'Delete successful category',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetActions.deleteCategoryFalse());
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* handleDeleteModel(action) {
  try {
    const id = action.payload;
    yield call(assetApi.deleteModel, id);

    yield put(assetActions.deleteModelSuccess());
    yield put(
      alertActions.showAlert({
        text: 'Delete successful model',
        type: 'success',
      })
    );
  } catch (error) {
    yield put(assetActions.deleteModelFalse());
    yield put(
      alertActions.showAlert({
        text: 'An error occurred, please try again',
        type: 'error',
      })
    );
  }
}

function* assetFlow() {
  yield all([
    takeLatest(assetActions.fetchData.type, handleFetchData),
    takeLatest(assetActions.getAssetById.type, handleGetAssetById),
    takeLatest(assetActions.getModels.type, handleGetModels),
    takeLatest(assetActions.getCategory.type, handleGetCategory),
    takeLatest(assetActions.createCategory.type, handleCreateCategory),
    takeLatest(assetActions.editCategory.type, handleEditCategory),
    takeLatest(assetActions.createModel.type, handleCreateModel),
    takeLatest(assetActions.editModel.type, handleEditModel),
    takeLatest(assetActions.createAsset.type, handleCreateAsset),
    takeLatest(assetActions.editAsset.type, handleEditAsset),
    takeEvery(assetActions.deleteAsset.type, handleDeleteAsset),
    takeEvery(assetActions.deleteCategory.type, handleDeleteCategoty),
    takeEvery(assetActions.deleteModel.type, handleDeleteModel),
  ]);
}

export function* assetSaga() {
  yield fork(assetFlow);
}
