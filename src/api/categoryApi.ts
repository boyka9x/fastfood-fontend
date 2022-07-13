import { Category, DataResponse, ListResponse } from '../models';
import axiosPrivate from './axiosClient';

const categoryApi = {
  getList(): Promise<ListResponse<Category>> {
    const url = '/product-category';
    return axiosPrivate.get(url);
  },
  getById(id: string): Promise<DataResponse<Category>> {
    const url = `/product-category/${id}`;
    return axiosPrivate.get(url);
  },
  create(data: Category): Promise<DataResponse<Category>> {
    const url = '/product-category';
    return axiosPrivate.post(url, data);
  },
  update(data: Category): Promise<DataResponse<Category>> {
    const url = `/product-category/${data._id}`;
    return axiosPrivate.put(url, data);
  },
  delete(id: string): Promise<DataResponse<Category>> {
    const url = `/product-category/${id}`;
    return axiosPrivate.delete(url);
  },
};

export default categoryApi;
