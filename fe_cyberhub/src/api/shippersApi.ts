import axiosInstance from './axiosInstance';

export const fetchShippers = async () => {
  const response = await axiosInstance.get('/shippers');
  return response.data;
};
