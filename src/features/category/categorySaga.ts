import { call, put, takeLatest } from 'redux-saga/effects';
import categoryApi from '../../api/categoryApi';
import { Category, ListResponse } from '../../models';
import { categoryActions } from './categorySlice';

function* fetchCategoryList() {
  try {
    const response: ListResponse<Category> = yield call(categoryApi.getList);
    yield put(categoryActions.fetchCategorySuccess(response));
  } catch (error) {
    yield put(categoryActions.fetchCategoryFailure());
  }
}

export default function* categorySaga() {
  yield takeLatest(categoryActions.fetchCategory.type, fetchCategoryList);
}
