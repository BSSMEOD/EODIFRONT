import type { AxiosError } from 'axios';
import axios from 'axios';
import { ROUTES, TOKEN } from '@/constants/common/constants';
import { Storage } from '@/api/storage/storage';

export const eodi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleUnauthorized = () => {
  alert('인증 정보가 만료되었습니다. 다시 로그인해주세요.');
  Storage.removeItem(TOKEN.ACCESS);
  Storage.removeItem(TOKEN.REFRESH);
  window.location.href = ROUTES.LOGIN || ROUTES.MAIN;
};

eodi.interceptors.request.use(
  (config) => {
    const token = Storage.getItem(TOKEN.ACCESS);
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

eodi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized) {
      handleUnauthorized();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
