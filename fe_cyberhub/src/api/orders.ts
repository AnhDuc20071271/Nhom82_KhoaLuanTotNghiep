import { getTokenFromCookies } from '../auth/authUtils';
import axios from 'axios';
import { OrderHistoryDTO } from '../types';


export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderData {
  customerId: number;
  totalPrice: number;
  status: string;
  addressLine: string;
  ward: string;
  district: string;
  city: string;
  specialNotes: string;
  invoiceRequired: boolean;
  products: OrderItem[];
}

// Hàm lấy danh sách orders (GET request)
export const fetchOrders = async () => {
  try {
    const token = getTokenFromCookies();

    if (!token) {
      throw new Error('Token không tồn tại trong Cookies.');
    }

    const response = await fetch('http://localhost:8080/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Đã có lỗi xảy ra khi lấy danh sách đơn hàng.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Hàm tạo đơn hàng mới (POST request)
export const createOrders = async (orderData: OrderData) => {
  try {
    const token = getTokenFromCookies();

    if (!token) {
      throw new Error('Token không tồn tại trong Cookies.');
    }

    const response = await fetch('http://localhost:8080/orders/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Đã có lỗi xảy ra khi tạo đơn hàng.');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const assignOrderToShipper = async (orderId: number, shipperId: number, assignedBy: number) => {
  const token = getTokenFromCookies();

  if (!token) {
    throw new Error('Token không tồn tại trong Cookies.');
  }

  await axios.post(
    `http://localhost:8080/orders/assign?orderId=${orderId}&assignedBy=${assignedBy}&assignedToUserId=${shipperId}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};


export const updateOrderStatus = async (orderId: number, status: string) => {
  const token = getTokenFromCookies();

  if (!token) {
    throw new Error('Token không tồn tại trong Cookies.');
  }

  const response = await axios.put(
    `http://localhost:8080/orders/${orderId}/status`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (response.status !== 200) {
    throw new Error('Không thể cập nhật trạng thái đơn hàng.');
  }

  return response.data;
};

export const deleteOrder = async (orderId: number) => {
  const token = getTokenFromCookies();

  if (!token) {
    throw new Error('Token không tồn tại trong Cookies.');
  }

  const response = await axios.delete(`http://localhost:8080/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status !== 200) {
    throw new Error('Không thể xóa đơn hàng.');
  }

  return response.data;
};

/**
 * Fetch order history from the API.
 * @param phone - Customer's phone number.
 * @param email - Customer's email address.
 * @param startDate - Start date for filtering orders.
 * @param endDate - End date for filtering orders.
 * @returns A promise that resolves to an array of OrderHistoryDTO.
 */
export const fetchOrderHistory = async (
  phone: string,
  email: string,
  startDate: string,
  endDate: string
): Promise<OrderHistoryDTO[]> => {
  try {
    const token = getTokenFromCookies(); // Lấy token từ Cookies
    if (!token) {
      throw new Error('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
    }

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders/history`, {
      params: { phone, email, startDate, endDate }, // Bao gồm startDate và endDate nếu cần
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching order history:', error);
    throw error.response?.data || error.message || 'Đã có lỗi xảy ra.';
  }
};

// Hàm tra cứu đơn hàng bằng invoiceNumber, phone và email
export const lookupOrder = async (invoiceNumber: string, phone: string, email: string) => {
  try {
    const token = getTokenFromCookies();
    
    if (!token) {
      throw new Error('Token không tồn tại trong Cookies.');
    }

    const response = await axios.get('http://localhost:8080/orders/lookup', {
      headers: {
        'Authorization': `Bearer ${token}`, // Đưa token vào header
      },
      params: {
        invoiceNumber,
        phone,
        email,
      }
    });

    if (response.status !== 200) {
      throw new Error('Không thể tra cứu đơn hàng.');
    }

    return response.data; // Trả về dữ liệu đơn hàng
  } catch (error) {
    console.error('Lỗi khi tra cứu đơn hàng:', error);
    throw error;
  }
};
