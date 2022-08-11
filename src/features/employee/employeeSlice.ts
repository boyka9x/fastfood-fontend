import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Employee, ListParams, ListResponse, PaginationParams } from '../../models';

export interface EmployeeState {
  loading: boolean;
  list: Employee[];
  filter: ListParams;
  pagination: PaginationParams;
}

const initialState: EmployeeState = {
  loading: false,
  list: [],
  filter: {
    _page: 1,
    _limit: 5,
  },
  pagination: { _page: 1, _limit: 5, _totalRecords: 5 },
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    fetchEmployee: (state, action: PayloadAction<ListParams>) => {
      state.loading = true;
    },
    fetchEmployeeSuccess: (state, action: PayloadAction<ListResponse<Employee>>) => {
      state.loading = false;
      state.list = action.payload.data;
      state.pagination = action.payload.pagination;
    },
    fetchEmployeeFailure: (state) => {
      state.loading = false;
    },

    setFilters: (state, action: PayloadAction<ListParams>) => {
      state.filter = action.payload;
    },
  },
});

// Actions
export const employeeActions = employeeSlice.actions;

// Selectors
export const selectIsLoading = (state: RootState) => state.employee.loading;
export const selectEmployeeList = (state: RootState) => state.employee.list;
export const selectEmployeeFilter = (state: RootState) => state.employee.filter;
export const selectEmployeePagination = (state: RootState) => state.employee.pagination;

// Reducers
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
