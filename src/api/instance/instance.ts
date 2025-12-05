import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { ROUTES } from '@/constants/common/constants';
import { refreshAccessToken } from '@/api/auth/auth';
import { useAuthStore } from '@/stores/useAuthStore';

export const eodi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const handleLogoutAndRedirect = async (message: string): Promise<null> => {
  alert(message);
  await useAuthStore.getState().logout();
  window.location.href = ROUTES.LOGIN || ROUTES.MAIN;
  return null;
};

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

eodi.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

eodi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;
    const { status } = error.response || {};
    const { accessToken } = useAuthStore.getState();

    const isTokenExpiredAndValidToRefresh =
      status === 401 && !!accessToken && !originalRequest._retry;

    if (isTokenExpiredAndValidToRefresh) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = null;

        refreshPromise = refreshAccessToken()
          .then(async (newToken) => {
            if (!newToken) {
              return await handleLogoutAndRedirect(
                '토큰 갱신에 실패했습니다. 다시 로그인해주세요.'
              );
            }
            useAuthStore.getState().updateAccessToken(newToken);
            eodi.defaults.headers.common.Authorization = `Bearer ${newToken}`;

            return newToken;
          })
          .catch(async () => {
            return await handleLogoutAndRedirect(
              '인증 정보가 완전히 만료되었습니다. 다시 로그인해주세요.'
            );
          })
          .finally(() => {
            isRefreshing = false;
          });
      }

      const newToken = await refreshPromise;

      if (newToken) {
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return eodi(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
