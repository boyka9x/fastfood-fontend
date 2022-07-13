import { push } from '@lagunovsky/redux-react-router';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, fork, put, take } from 'redux-saga/effects';
import customerApi from '../../api/customerApi';
import { DataResponse, Token } from '../../models';
import { Customer } from '../../models/customer';
import { authActions, LoginPayload } from './authSlice';

function* fetchCustomer() {
  const response: DataResponse<Customer> = yield call(customerApi.getInfo);
  yield put(authActions.setUser(response.data));
}

function* handleLogin(payload: LoginPayload) {
  try {
    if (payload.role === 'customer') {
      const response: DataResponse<Token> = yield call(customerApi.login, payload);

      localStorage.setItem('access_token', response.data.accessToken);
      localStorage.setItem('refresh_token', response.data.refreshToken);
      localStorage.setItem('role', payload.role);

      yield put(authActions.loginSuccess());
      yield put(push('/'));
      yield call(fetchCustomer);
    }
  } catch (error: any) {
    yield put(authActions.loginFailure(error.message));
  }
}

function* handleLoginWithToken(isLoggedIn: string) {
  const role = localStorage.getItem('role');

  try {
    if (role === 'customer') {
      yield call(fetchCustomer);
      yield put(authActions.loginSuccess());
    }
  } catch (error: any) {
    yield put(authActions.loginFailure(error.message));
  }
}

function* handleLogout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('role');

  // redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = localStorage.getItem('refresh_token');
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    } else {
      yield fork(handleLoginWithToken, isLoggedIn);
    }

    yield take([authActions.logout.type, authActions.loginFailure.type]);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
