import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import { useAppDispatch } from '../app/hooks';
import { authActions } from '../features/auth/authSlice';

const BASE_URL = 'http://localhost:5000/api';

interface AxiosRequestCustom extends AxiosRequestConfig {
  retry?: boolean;
}

interface JwtPayloadCustom extends JwtPayload {
  type: string;
}

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosPrivate.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
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
          const response = await axiosPrivate.post(`/${type}s/token`, { refreshToken });
          prevRequest.headers!.Authorization = `Bearer ${response.data}`;
          return axiosPrivate(prevRequest);
        }
      }

      const dispatch = useAppDispatch();
      dispatch(authActions.logout());
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
