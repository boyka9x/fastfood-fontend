import { PayloadAction } from '@reduxjs/toolkit';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import productApi from '../../api/productApi';
import { ListParams, ListResponse, Product } from '../../models';
import { productActions } from './productReducer';

function* fetchProductList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Product> = yield call(productApi.getList, action.payload);
    yield put(productActions.fetchProductSuccess(response));
  } catch (error) {
    yield put(productActions.fetchProductFailure());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(productActions.setFilters(action.payload));
}

export default function* productSaga() {
  yield takeLatest(productActions.fetchProduct.type, fetchProductList);
  yield debounce(500, productActions.setFiltersWithDebounce.type, handleSearchDebounce);
}
