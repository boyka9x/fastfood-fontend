import { Category } from './category';

export interface Product {
  _id?: string;
  name: string;
  slug: string;
  price: number;
  priceDiscount: number;
  type: string | Category;

  image?: string;
  status?: string;
}
