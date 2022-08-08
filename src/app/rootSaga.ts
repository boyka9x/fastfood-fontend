import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import cartSaga from '../features/cart/cartSaga';
import categorySaga from '../features/category/categorySaga';
import dashboardSaga from '../features/dashboard/dashboardSaga';
import orderSaga from '../features/order/orderSaga';
import productSaga from '../features/product/productSaga';

export default function* rootSaga() {
  yield all([authSaga(), productSaga(), categorySaga(), cartSaga(), orderSaga(), dashboardSaga()]);
}
