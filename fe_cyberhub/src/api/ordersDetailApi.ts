// src/api/orders.ts
import axiosInstance from './axiosInstance';

export const fetchOrdersDetails = async () => {
  const response = await axiosInstance.get('/orderDetails');
  return response.data;
};

export const fetchOrderDetailById = async (id: string | number) => {
  if (!id) {
    throw new Error("ID is undefined or invalid");
  }
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};

