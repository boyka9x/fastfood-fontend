import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: '',
  reducers: {},
});

// Actions
export const orderActions = orderSlice.actions;

// Selectors

// Reducers
const orderReducer = orderSlice.reducer;
export default orderReducer;
