import axiosInstance from './axiosInstance';

export const fetchDeliveryAssignments = async () => {
  const response = await axiosInstance.get('/deliveryAssignments');
  return response.data;
};
