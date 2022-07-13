import { PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import orderApi from '../../api/orderApi';
import { DataResponse } from '../../models';
import { cartActions, CartOrder } from './cartSlice';

function* handleOrder(action: PayloadAction<CartOrder>) {
  try {
    const response: DataResponse<null> = yield call(orderApi.create, action.payload);
    if (response.status === 'success') {
      yield put(cartActions.orderSuccess());
      toast.success(response.message);
    }
  } catch (error: any) {
    yield put(cartActions.orderFailure());
    toast.error(error.message);
  }
}

export default function* cartSaga() {
  yield takeLatest(cartActions.order.type, handleOrder);
}
