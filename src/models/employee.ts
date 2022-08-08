export interface Employee {
  _id?: string;
  username: string;
  email: string;
  phoneNumber: string;
  password?: string;
  confirmPassword?: string;
  address?: string;
  image?: string;

  type?: string;
}
