import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ListParams, ListResponse, Order, PaginationParams } from '../../models';

export interface OrderState {
  loading: boolean;
  list: Order[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: OrderState = {
  loading: false,
  list: [],
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

// Reducers
const orderReducer = orderSlice.reducer;
export default orderReducer;
