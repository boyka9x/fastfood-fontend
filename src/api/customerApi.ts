import { LoginPayload } from '../features/auth/authSlice';
import { DataResponse, Token } from '../models';
import { Customer } from '../models/customer';
import axiosPrivate from './axiosClient';

const customerApi = {
  getInfo(): Promise<DataResponse<Customer>> {
    const url = `/customers/profile`;
    return axiosPrivate.get(url);
  },
  register(data: Customer): Promise<DataResponse<null>> {
    const url = `/customers/register`;
    return axiosPrivate.post(url, data);
  },
  login(data: LoginPayload): Promise<DataResponse<Token>> {
    const url = `/customers/login`;
    return axiosPrivate.post(url, data);
  },
  logout(data: Partial<Token>): Promise<DataResponse<null>> {
    const url = `/customers/logout`;
    return axiosPrivate.post(url, data);
  },
  getNewToken(data: Partial<Token>): Promise<DataResponse<string>> {
    const url = `/customers/token`;
    return axiosPrivate.post(url, data);
  },
};

export default customerApi;
