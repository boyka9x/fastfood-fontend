import { CartOrder } from '../features/cart/cartSlice';
import { DataResponse } from '../models';
import axiosPrivate from './axiosClient';

const orderApi = {
  create(data: CartOrder): Promise<DataResponse<null>> {
    const url = '/orders';
    return axiosPrivate.post(url, data);
  },
};

export default orderApi;
