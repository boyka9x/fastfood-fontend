import { DataResponse, ListParams, ListResponse, Product } from '../models';
import axiosPrivate from './axiosClient';

const productApi = {
  getList(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/products';
    return axiosPrivate.get(url, { params });
  },
  getListDeleted(params: ListParams): Promise<ListResponse<Product>> {
    const url = '/products/deleted';
    return axiosPrivate.get(url, { params });
  },
  getBySlug(slug: string): Promise<DataResponse<Product>> {
    const url = `/products/${slug}`;
    return axiosPrivate.get(url);
  },
  getById(id: string): Promise<DataResponse<Product>> {
    const url = `/products/${id}`;
    return axiosPrivate.get(url);
  },
  create(data: Product): Promise<DataResponse<Product>> {
    const url = '/products';
    return axiosPrivate.post(url, data);
  },
  update(data: Partial<Product>): Promise<DataResponse<Product>> {
    const url = `/products/${data._id}`;
    return axiosPrivate.put(url, data);
  },
  delete(id: string): Promise<DataResponse<null>> {
    const url = `/products/${id}`;
    return axiosPrivate.delete(url);
  },
  restore(id: string): Promise<DataResponse<null>> {
    const url = `/products/${id}/restore`;
    return axiosPrivate.patch(url);
  },
};

export default productApi;
