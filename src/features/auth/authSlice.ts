import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Customer } from '../../models/customer';
import { Employee } from '../../models/employee';

export interface LoginPayload {
  email?: string;
  phoneNumber?: string;
  password: string;
  role?: string;
}

export interface IAuthState {
  isLoggedIn: boolean;
  loading: boolean;
  currentUser?: Customer | Employee;
}

const initialState: IAuthState = {
  isLoggedIn: false,
  loading: false,
  currentUser: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.loading = true;
    },
    loginSuccess: (state) => {
      state.loading = false;
      state.isLoggedIn = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
    },

    setUser: (state, action: PayloadAction<Customer | Employee>) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLoading = (state: RootState) => state.auth.loading;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
