import axios from 'axios';
import { getTokenFromCookies } from '@auth/authUtils';

export const fetchUsers = async () => {
  try {
    const token = getTokenFromCookies(); // Lấy token từ Cookies
    const response = await axios.get('http://localhost:8080/users', {
      headers: {
        Authorization: `Bearer ${token}`, // Sử dụng token từ Cookies
      },
    });
    return response.data;
  } catch (error) {
    console.error('Lỗi khi fetch users:', error);
    throw error;
  }
};

// Hàm lấy danh sách các user với vai trò "NhanVienGiaoHang"
export const fetchNhanVienGiaoHang = async () => {
  try {
    const users = await fetchUsers();
    return users.filter(user => user.role === 'NhanVienGiaoHang');
  } catch (error) {
    console.error('Lỗi khi fetch NhanVienGiaoHang:', error);
    throw error;
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const token = getTokenFromCookies(); // Lấy token từ Cookies
    await axios.put(
      `http://localhost:8080/users/${userId}/role`,
      { role: newRole },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Sử dụng token từ Cookies
        },
      }
    );
  } catch (error) {
    console.error('Error updating user role:', error);
    throw error;
  }
};
