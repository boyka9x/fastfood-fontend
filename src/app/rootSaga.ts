import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/authSaga';
import cartSaga from '../features/cart/cartSaga';
import categorySaga from '../features/category/categorySaga';
import productSaga from '../features/product/productSaga';

export default function* rootSaga() {
  yield all([authSaga(), productSaga(), categorySaga(), cartSaga()]);
}
