import { LoginPayload } from '../features/auth/authSlice';
import { DataResponse, ListParams, ListResponse, Token } from '../models';
import { Employee } from '../models/employee';
import axiosPrivate from './axiosClient';

const employeeApi = {
  getList(params: ListParams): Promise<ListResponse<Employee>> {
    const url = '/employees';
    return axiosPrivate.get(url, { params });
  },
  getListDeleted(params: ListParams): Promise<ListResponse<Employee>> {
    const url = '/employees/deleted';
    return axiosPrivate.get(url, { params });
  },
  getById(): Promise<DataResponse<Employee>> {
    const url = '/employees/auth';
    return axiosPrivate.get(url);
  },
  register(data: Partial<Employee>): Promise<DataResponse<null>> {
    const url = `/employees/register`;
    return axiosPrivate.post(url, data);
  },
  login(data: LoginPayload): Promise<DataResponse<Token>> {
    const url = '/employees/login';
    return axiosPrivate.post(url, data);
  },
  update(data: Partial<Employee>): Promise<DataResponse<null>> {
    const url = '/employees';
    return axiosPrivate.put(url, data);
  },
  delete(id: string): Promise<DataResponse<null>> {
    const url = `/employees/${id}`;
    return axiosPrivate.delete(url);
  },
  restore(id: string): Promise<DataResponse<null>> {
    const url = `/employees/${id}/restore`;
    return axiosPrivate.patch(url);
  },
  createToken(data: Partial<Token>): Promise<DataResponse<string>> {
    const url = '/employees/token';
    return axiosPrivate.post(url, data);
  },
};

export default employeeApi;
