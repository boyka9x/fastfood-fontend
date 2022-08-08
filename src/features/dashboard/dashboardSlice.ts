import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Order } from '../../models';

export interface DashboardStatistics {
  orderCount: number;
  transactionCount: number;
  shippingCount: number;
  completeCount: number;
}

export interface DashboardState {
  loading: boolean;
  statistics: DashboardStatistics;
  orderList: Order[];
  transactionList: Order[];
  managerOrderList: Order[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    orderCount: 0,
    transactionCount: 0,
    shippingCount: 0,
    completeCount: 0,
  },
  orderList: [],
  transactionList: [],
  managerOrderList: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchData: (state) => {
      state.loading = true;
    },
    fetchDataSuccess: (state) => {
      state.loading = false;
    },
    fetchDataFailure: (state) => {
      state.loading = false;
    },

    setStatistics: (state, action: PayloadAction<DashboardStatistics>) => {
      state.statistics = action.payload;
    },
    setOrderList: (state, action: PayloadAction<Order[]>) => {
      state.orderList = action.payload;
    },
    setTransactionList: (state, action: PayloadAction<Order[]>) => {
      state.transactionList = action.payload;
    },
  },
});

// Actions
export const dashboardActions = dashboardSlice.actions;

// Selectors
export const selectIsLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectOrderList = (state: RootState) => state.dashboard.orderList;
export const selectTransactionList = (state: RootState) => state.dashboard.transactionList;
export const selectManagerList = (state: RootState) => state.dashboard.managerOrderList;

// Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
