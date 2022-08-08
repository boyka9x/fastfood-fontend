import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { call, debounce, put, takeLatest } from 'redux-saga/effects';
import orderApi from '../../api/orderApi';
import { DataResponse, ListParams, ListResponse, Order } from '../../models';
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

function* fetchOrderManagerList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<Order> = yield call(orderApi.getListByManager, action.payload);
    if (response.status === 'success') {
      yield put(orderActions.fetchOrderManagerSuccess(response));
    }
    if (response.status === 'error') {
      toast.error(response.message);
    }
  } catch (error: any) {
    yield put(orderActions.fetchOrderManagerFailure());
  }
}

function* fetchOrderById(action: PayloadAction<string>) {
  try {
    const res: DataResponse<Order> = yield call(orderApi.getById, action.payload);
    yield put(orderActions.fetchOrderByIdSuccess(res));
  } catch (error) {
    yield put(orderActions.fetchOrderByIdFailure());
    toast.error('Fail to fetch order');
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(orderActions.setFilters(action.payload));
}

function* confirmOrder(action: PayloadAction<string>) {
  try {
    const res: DataResponse<Order> = yield call(orderApi.confirm, action.payload);
    yield put(orderActions.confirmOrderSuccess(res));
    toast.success(res.message);
  } catch (error) {
    yield put(orderActions.confirmOrderFailure());
    toast.error('Fail to confirm order');
  }
}

function* transportOrder(action: PayloadAction<string>) {
  try {
    const res: DataResponse<Order> = yield call(orderApi.shipping, action.payload);
    yield put(orderActions.transportOrderSuccess(res));
    toast.success(res.message);
  } catch (error) {
    yield put(orderActions.transportOrderFailure());
    toast.error('Fail to transport order');
  }
}

function* completeOrder(action: PayloadAction<string>) {
  try {
    const res: DataResponse<Order> = yield call(orderApi.complete, action.payload);
    yield put(orderActions.completeOrderSuccess(res));
    toast.success(res.message);
  } catch (error) {
    yield put(orderActions.completeOrderFailure());
    toast.error('Fail to complete order');
  }
}

export default function* orderSaga() {
  yield takeLatest(orderActions.fetchOrder.type, fetchOrderList);
  yield takeLatest(orderActions.fetchOrderManager.type, fetchOrderManagerList);
  yield takeLatest(orderActions.fetchOrderById.type, fetchOrderById);
  yield takeLatest(orderActions.confirmOrder.type, confirmOrder);
  yield takeLatest(orderActions.transportOrder.type, transportOrder);
  yield takeLatest(orderActions.completeOrder.type, completeOrder);
  yield debounce(500, orderActions.setFiltersWithDebounce.type, handleSearchDebounce);
}
