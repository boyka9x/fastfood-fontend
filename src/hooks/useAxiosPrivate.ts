import axiosPrivate from '../api/axiosClient';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface AxiosRequestCustom extends AxiosRequestConfig {
  retry?: boolean;
}

const useAxiosPrivate = () => {
  const accessToken = localStorage.getItem('access_token');
  const refresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        if (!config.headers!.Authorization) {
          config.headers!.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const prevRequest: AxiosRequestCustom = error.config;
        if (error?.response?.status === 401 && !prevRequest.retry) {
          prevRequest.retry = true;
          const newAccessToken = await refresh();
          prevRequest.headers!.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
