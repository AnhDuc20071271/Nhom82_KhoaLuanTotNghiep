// src/api/profileApi.ts

import axios from 'axios';
import { getTokenFromCookies } from '../auth/authUtils'; // Import hàm lấy token từ Cookies

/**
 * Fetch the profile of the currently authenticated user.
 * @returns A promise that resolves to the user's profile data.
 */
export const fetchProfile = async () => {
  try {
    const token = getTokenFromCookies(); // Lấy token từ Cookies
    if (!token) {
      throw new Error('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/myprofile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Trả về toàn bộ dữ liệu profile
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    throw error.response?.data || error.message || 'Đã có lỗi xảy ra.';
  }
};
