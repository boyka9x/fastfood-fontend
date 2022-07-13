import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Product } from '../../models';

export interface CartProduct extends Product {
  quantity: number;
}

export interface CartList {
  [key: string]: CartProduct;
}

export interface CartOrder {
  products: CartProduct[];
  comments?: string;
}

export interface CartState {
  loading: boolean;
  list: CartList;
  totalPrice: number;
  coupon?: string;
  comments?: string;
}

const initialState: CartState = {
  loading: false,
  list: {},
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const { _id, price, priceDiscount } = action.payload;

      if (_id) {
        const isExisted = state.list.hasOwnProperty(_id);
        if (isExisted) {
          state.list[_id].quantity += 1;
        } else {
          state.list[_id] = { ...action.payload, quantity: 1 };
        }
        state.totalPrice += priceDiscount !== 0 ? priceDiscount : price;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      state.totalPrice -=
        (state.list[_id].priceDiscount !== 0
          ? state.list[_id].priceDiscount
          : state.list[_id].price) * state.list[_id].quantity;
      delete state.list[_id];
    },

    increaseQuantity: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      state.list[_id].quantity += 1;
      state.totalPrice +=
        state.list[_id].priceDiscount !== 0 ? state.list[_id].priceDiscount : state.list[_id].price;
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      if (state.list[_id].quantity === 1) return;
      state.list[_id].quantity -= 1;
      state.totalPrice -=
        state.list[_id].priceDiscount !== 0 ? state.list[_id].priceDiscount : state.list[_id].price;
    },
    clearAll: (state) => {
      state.list = {};
      state.totalPrice = 0;
    },

    order: (state, action: PayloadAction<CartOrder>) => {
      state.loading = true;
    },
    orderSuccess: (state) => {
      state.loading = false;
      state.list = {};
      state.totalPrice = 0;
    },
    orderFailure: (state) => {
      state.loading = false;
    },
  },
});

// Actions
export const cartActions = cartSlice.actions;

// Selectors
export const selectIsLoading = (state: RootState) => state.cart.loading;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectCartList = (state: RootState) => state.cart.list;

export const selectCartMap = createSelector(selectCartList, (list) => {
  return Object.values(list);
});

// Reducers
const cartReducer = cartSlice.reducer;
export default cartReducer;
