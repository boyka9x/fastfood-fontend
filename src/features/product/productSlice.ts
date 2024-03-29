import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ListParams, ListResponse, PaginationParams, Product } from '../../models';

export interface ProductState {
  loading: boolean;
  list: Product[];
  deletedList: Product[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: ProductState = {
  loading: false,
  list: [],
  deletedList: [],
  filter: {
    _page: 1,
    _limit: 8,
  },
  pagination: {
    _page: 1,
    _limit: 8,
    _totalRecords: 8,
  },
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProduct: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchProductSuccess: (state, action: PayloadAction<ListResponse<Product>>) => {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchProductFailure: (state) => {
      state.loading = false;
    },

    fetchDeletedProduct: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchDeletedProductSuccess: (state, action: PayloadAction<ListResponse<Product>>) => {
      state.loading = false;
      state.deletedList = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchDeletedProductFailure: (state) => {
      state.loading = false;
    },

    setFilters: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload;
    },
    setFiltersWithDebounce: (state, action: PayloadAction<ListParams>) => {},
  },
});

// Actions
export const productActions = productSlice.actions;

// Selectors
export const selectIsLoading = (state: RootState) => state.product.loading;
export const selectProductList = (state: RootState) => state.product.list;
export const selectDeletedProductList = (state: RootState) => state.product.deletedList;
export const selectProductFilter = (state: RootState) => state.product.filter;
export const selectProductPagination = (state: RootState) => state.product.pagination;

// Reducers
const productReducer = productSlice.reducer;
export default productReducer;
