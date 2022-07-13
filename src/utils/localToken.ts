import { Token } from '../models';

export const setToken = (token: Token) => {
  localStorage.setItem('access_token', token.accessToken);
  localStorage.setItem('access_token', token.accessToken);
};

export const clearToken = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};
