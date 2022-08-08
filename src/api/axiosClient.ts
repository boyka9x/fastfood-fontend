import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { browserHistory } from '../app/history';
import { store } from '../app/store';
import { authActions } from '../features/auth/authSlice';

// const BASE_URL_HOST = 'http://localhost:5000/api';
const BASE_URL_HOST = 'https://fast-food-boyka.herokuapp.com/api';

interface AxiosRequestCustom extends AxiosRequestConfig {
  retry?: boolean;
}

interface JwtPayloadCustom extends JwtPayload {
  type: string;
}

export const axiosPublic = axios.create({
  baseURL: BASE_URL_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});
const accessToken = localStorage.getItem('access_token');

axiosPrivate.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers!.Authorization) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const prevRequest: AxiosRequestCustom = error.config;
    if (error.response?.status === 401 && !prevRequest?.retry) {
      prevRequest.retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        const { exp, type } = jwt_decode<JwtPayloadCustom>(refreshToken);

        if (exp && exp * 1000 > Date.now()) {
          let response: any;
          if (type === 'customer') {
            response = await axiosPrivate.post(`/${type}s/token`, { refreshToken });
          }
          if (type === 'admin' || type === 'staff') {
            response = await axiosPrivate.post(`/employees/token`, { refreshToken });
          }
          localStorage.setItem('access_token', response.data);
          prevRequest.headers!.Authorization = `Bearer ${response.data}`;
          return axiosPrivate(prevRequest);
        }
        store.dispatch(authActions.logout());
      }

      browserHistory.push('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
