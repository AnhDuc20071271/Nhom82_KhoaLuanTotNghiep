// src/api/axiosInstance.ts
import axios from 'axios';
import { getTokenFromCookies } from '../auth/authUtils';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Đổi URL thành URL của backend nếu khác
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies(); // Lấy token từ Cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
