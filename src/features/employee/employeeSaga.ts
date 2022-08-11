import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest } from 'redux-saga/effects';
import employeeApi from '../../api/employeeApi';
import { Employee, ListParams, ListResponse } from '../../models';
import { employeeActions } from './employeeSlice';

function* fetchEmployeeList(action: PayloadAction<ListParams>) {
  try {
    const res: ListResponse<Employee> = yield call(employeeApi.getList, action.payload);
    yield put(employeeActions.fetchEmployeeSuccess(res));
  } catch (error) {
    yield put(employeeActions.fetchEmployeeFailure());
  }
}

export default function* employeeSaga() {
  yield takeLatest(employeeActions.fetchEmployee.type, fetchEmployeeList);
}
