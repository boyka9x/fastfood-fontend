export interface Employee {
  _id?: string;
  username: string;
  email: string;
  phoneNumber: string;
  password?: string;
  passwordConfirm?: string;
  address?: string;
  image?: string;

  type?: string;
}
