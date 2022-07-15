import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import orderApi from '../../api/orderApi';
import { ListParams, ListResponse, Order } from '../../models';
import { orderActions } from './orderSlice';

function* fetchOrderList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Order> = yield call(orderApi.getListByCustomer, action.payload);
    if (response.status === 'success') {
      yield put(orderActions.fetchOrderSuccess(response));
    }
    if (response.status === 'error') {
      toast.error(response.message);
    }
  } catch (error: any) {
    yield put(orderActions.fetchOrderFailure());
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(orderActions.setFilters(action.payload));
}

export default function* orderSaga() {
  yield takeLatest(orderActions.fetchOrder.type, fetchOrderList);
  yield debounce(500, orderActions.setFiltersWithDebounce.type, handleSearchDebounce);
}
