import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  DataResponse,
  ListParams,
  ListResponse,
  Order,
  OrderProduct,
  PaginationParams,
} from '../../models';

export interface OrderState {
  loading: boolean;
  list: Order[];
  filter: ListParams;
  pagination: PaginationParams;
  currentOrder: Order;
}

const initialState: OrderState = {
  loading: false,
  list: [],
  currentOrder: {
    products: [] as OrderProduct[],
  } as Order,
  filter: {
    _page: 1,
    _limit: 5,
  },
  pagination: {
    _page: 1,
    _limit: 5,
    _totalRecords: 5,
  },
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrder: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchOrderSuccess: (state, action: PayloadAction<ListResponse<Order>>) => {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchOrderFailure: (state) => {
      state.loading = false;
    },

    fetchOrderManager: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchOrderManagerSuccess: (state, action: PayloadAction<ListResponse<Order>>) => {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchOrderManagerFailure: (state) => {
      state.loading = false;
    },

    fetchOrderById: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    fetchOrderByIdSuccess: (state, action: PayloadAction<DataResponse<Order>>) => {
      state.loading = false;
      state.currentOrder = action.payload.data;
    },
    fetchOrderByIdFailure: (state) => {
      state.loading = false;
    },

    // Confirm
    confirmOrder: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    confirmOrderSuccess: (state, action: PayloadAction<DataResponse<Order>>) => {
      state.loading = false;
      state.currentOrder = action.payload.data;
    },
    confirmOrderFailure: (state) => {
      state.loading = false;
    },

    // Transport
    transportOrder: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    transportOrderSuccess: (state, action: PayloadAction<DataResponse<Order>>) => {
      state.loading = false;
      state.currentOrder = action.payload.data;
    },
    transportOrderFailure: (state) => {
      state.loading = false;
    },

    // Complete
    completeOrder: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    completeOrderSuccess: (state, action: PayloadAction<DataResponse<Order>>) => {
      state.loading = false;
      state.currentOrder = action.payload.data;
    },
    completeOrderFailure: (state) => {
      state.loading = false;
    },

    setFilters: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload;
    },
    setFiltersWithDebounce: (state, action: PayloadAction<ListParams>) => {},
  },
});

// Actions
export const orderActions = orderSlice.actions;

// Selectors
export const selectIsLoading = (state: RootState) => state.order.loading;
export const selectOrderList = (state: RootState) => state.order.list;
export const selectOrderFilter = (state: RootState) => state.order.filter;
export const selectOrderPagination = (state: RootState) => state.order.pagination;
export const selectCurrentOrder = (state: RootState) => state.order.currentOrder;

// Reducers
const orderReducer = orderSlice.reducer;
export default orderReducer;
