import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Category, ListResponse } from '../../models';

export interface CategoryState {
  loading: boolean;
  list: Category[];
}

const initialState: CategoryState = {
  loading: false,
  list: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategory: (state) => {
      state.loading = true;
    },
    fetchCategorySuccess: (state, action: PayloadAction<ListResponse<Category>>) => {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCategoryFailure: (state) => {
      state.loading = false;
    },
  },
});

// Actions
export const categoryActions = categorySlice.actions;

// Selectors
export const selectCategoryLoading = (state: RootState) => state.category.loading;
export const selectCategoryList = (state: RootState) => state.category.list;

export const selectCategoryOptions = createSelector(selectCategoryList, (list: Category[]) => {
  return list.map((category: Category) => ({
    label: category.name,
    value: category._id as string,
  }));
});

// Reducer
const categoryReducer = categorySlice.reducer;
export default categoryReducer;
