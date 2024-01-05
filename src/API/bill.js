import axiosInstance from './axiosInstance';

export const getAllBills = async () => {
  const res = await axiosInstance.get('/hd');
  return res.data;
};

export const getBillDetail = async ({ CMND }) => {
  const res = await axiosInstance.get(`/hd`, { params: { CMND } });
  return res.data;
};

export const updateBill = async ({ id, data }) => {
  const res = await axiosInstance.put(`/hd/${id}`, data);
  return res.data;
};
