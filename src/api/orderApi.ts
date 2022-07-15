import { CartOrder } from '../features/cart/cartSlice';
import { DataResponse, ListParams, ListResponse, Order } from '../models';
import axiosPrivate from './axiosClient';

const orderApi = {
  create(data: CartOrder): Promise<DataResponse<null>> {
    const url = '/orders';
    return axiosPrivate.post(url, data);
  },
  getListByCustomer(params: ListParams): Promise<ListResponse<Order>> {
    const url = '/orders/customer';
    return axiosPrivate.get(url, { params });
  },
  getListByManager(params: ListParams): Promise<ListResponse<Order>> {
    const url = '/orders/manager';
    return axiosPrivate.get(url, { params });
  },
  getById(id: string): Promise<DataResponse<Order>> {
    const url = `/orders/${id}`;
    return axiosPrivate.get(url);
  },
  confirm(id: string): Promise<DataResponse<null>> {
    const url = `/orders/${id}/confirm`;
    return axiosPrivate.patch(url);
  },
  shipping(id: string): Promise<DataResponse<null>> {
    const url = `/orders/${id}/shipping`;
    return axiosPrivate.patch(url);
  },
  payment(id: string): Promise<DataResponse<null>> {
    const url = `/orders/${id}/payment`;
    return axiosPrivate.patch(url);
  },
  complete(id: string): Promise<DataResponse<null>> {
    const url = `/orders/${id}/complete`;
    return axiosPrivate.patch(url);
  },
  cancel(id: string): Promise<DataResponse<null>> {
    const url = `/orders/${id}/cancel`;
    return axiosPrivate.patch(url);
  },
  delete(id: string): Promise<DataResponse<null>> {
    const url = `/orders/${id}`;
    return axiosPrivate.delete(url);
  },
};

export default orderApi;
