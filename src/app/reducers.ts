import { combineReducers } from 'redux';
import { createRouterReducer } from '@lagunovsky/redux-react-router';
import { browserHistory } from './history';
import authReducer from '../features/auth/authSlice';
import categoryReducer from '../features/category/categorySlice';
import productReducer from '../features/product/productReducer';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/orderSlice';

export const rootReducer = combineReducers({
  router: createRouterReducer(browserHistory),
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
});
