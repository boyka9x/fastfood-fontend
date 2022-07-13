export interface OrderProduct {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id?: string;
  totalPrice: number;
  comments?: string;
  confirmDate?: Date;
  paymentDate?: Date;
  shipmentDate?: Date;
  cancelDate?: Date;
  couponId?: string;
  customerId?: string;
  employeeId?: string;
  products: OrderProduct[];
  status: string;
}
