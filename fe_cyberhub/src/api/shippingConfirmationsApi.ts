import axiosInstance from './axiosInstance';

export const fetchShippingConfirmations = async () => {
  const response = await axiosInstance.get('/shippingConfirmations');
  return response.data;
};
