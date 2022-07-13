export interface Customer {
  id?: string | number;
  username: string;
  phoneNumber: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  image?: string;
  coin?: number;

  type?: string;
}
