// src/auth/authUtils.ts
import Cookies from 'js-cookie';

// Hàm lưu token vào Cookies
export const setTokenToCookies = (token: string, expiresInDays: number = 2) => {
  Cookies.set('token', token, { expires: expiresInDays, secure: true, sameSite: 'strict' });
};

// Hàm lấy token từ Cookies
export const getTokenFromCookies = () => {
  return Cookies.get('token');
};

// Hàm xóa token khỏi Cookies
export const removeTokenFromCookies = () => {
  Cookies.remove('token');
};

// Hàm lưu role vào Cookies
export const setRoleToCookies = (role: string, expiresInDays: number = 2) => {
  Cookies.set('role', role, { expires: expiresInDays, secure: true, sameSite: 'strict' });
};

// Hàm lấy role từ Cookies
export const getRoleFromCookies = () => {
  return Cookies.get('role');
};

// Hàm kiểm tra người dùng đã xác thực hay chưa
export const isAuthenticated = () => {
  const token = getTokenFromCookies();
  return !!token;
};

// Hàm kiểm tra người dùng có vai trò cụ thể hay không
export const hasRole = (requiredRoles: string[]) => {
  const role = getRoleFromCookies();
  return requiredRoles.includes(role || '');
};

// Hàm lưu orderId vào Cookies
export const setOrderIdToCookies = (orderId: string, expiresInDays: number = 2) => {
  Cookies.set('orderId', orderId, { expires: expiresInDays, secure: true, sameSite: 'strict' });
};

// Hàm lấy orderId từ Cookies
export const getOrderIdFromCookies = () => {
  return Cookies.get('orderId');
};

// Hàm lưu customerInfo vào Cookies
export const setCustomerInfoToCookies = (customerInfo: string, expiresInDays: number = 2) => {
  Cookies.set('customerInfo', customerInfo, { expires: expiresInDays, secure: true, sameSite: 'strict' });
};

// Hàm lấy customerInfo từ Cookies
export const getCustomerInfoFromCookies = () => {
  return Cookies.get('customerInfo');
};

// Hàm lưu finalTotalPrice vào Cookies
export const setFinalTotalPriceToCookies = (price: string, expiresInDays: number = 2) => {
  Cookies.set('finalTotalPrice', price, { expires: expiresInDays, secure: true, sameSite: 'strict' });
};

// Hàm lấy finalTotalPrice từ Cookies
export const getFinalTotalPriceFromCookies = () => {
  return Cookies.get('finalTotalPrice');
};

// Hàm xóa finalTotalPrice khỏi Cookies
export const removeFinalTotalPriceFromCookies = () => {
  Cookies.remove('finalTotalPrice');
};

// === Thêm các hàm còn thiếu ===

// Hàm lưu totalPrice vào Cookies
export const setTotalPriceToCookies = (totalPrice: string, expiresInDays: number = 2) => {
  Cookies.set('totalPrice', totalPrice, { expires: expiresInDays, secure: true, sameSite: 'strict' });
};

// Hàm lấy totalPrice từ Cookies
export const getTotalPriceFromCookies = () => {
  return Cookies.get('totalPrice');
};

// Hàm xóa totalPrice khỏi Cookies
export const removeTotalPriceFromCookies = () => {
  Cookies.remove('totalPrice');
};

// Hàm lưu cart vào Cookies
export const setCartToCookies = (cart: string, expiresInDays: number = 2) => {
  Cookies.set('cart', cart, { expires: expiresInDays, secure: true, sameSite: 'strict' });
};

// Hàm lấy cart từ Cookies
export const getCartFromCookies = () => {
  return Cookies.get('cart');
};

// Hàm xóa cart khỏi Cookies
export const removeCartFromCookies = () => {
  Cookies.remove('cart');
};

// Hàm lưu token của nhân viên giao hàng vào Cookies
export const setDeliveryStaffToken = (token: string, expiresInDays: number = 2) => {
  Cookies.set('deliveryStaffToken', token, { expires: expiresInDays, secure: true, sameSite: 'strict' });
};

// Hàm lấy token của nhân viên giao hàng từ Cookies
export const getDeliveryStaffToken = () => {
  return Cookies.get('deliveryStaffToken');
};

// Hàm kiểm tra nhân viên giao hàng đã xác thực chưa
export const isDeliveryStaffAuthenticated = () => {
  const token = getDeliveryStaffToken();
  return !!token;
};

// Hàm xóa token của nhân viên giao hàng khỏi Cookies
export const removeDeliveryStaffToken = () => {
  Cookies.remove('deliveryStaffToken');
};