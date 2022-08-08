import { Product } from './product';

export interface OrderProduct {
  productId: Product;
  quantity: number;
  price: number;
  name?: string;
}

export interface Order {
  _id?: string;
  totalPrice: number;
  comments?: string;
  confirmDate?: string;
  paymentDate?: string;
  shipmentDate?: string;
  cancelDate?: string;
  couponId?: string;
  customerId?: string;
  employeeId?: string;
  products: OrderProduct[];
  status: string;

  createdAt?: string;
  updatedAt?: string;
}
