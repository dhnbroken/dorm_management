import axiosInstance from './axiosInstance';

export const getAllBills = async ({ itemPage, currentPage }) => {
  const res = await axiosInstance.get('/hd', { params: { itemPage, currentPage } });
  return res.data;
};

export const getBillDetail = async ({ CMND }) => {
  const res = await axiosInstance.get(`/hd/student/${CMND}`);
  return res.data;
};

export const updateBill = async ({ id, data }) => {
  const res = await axiosInstance.put(`/hd/${id}`, data);
  return res.data;
};

export const createBill = async ({ data }) => {
  const res = await axiosInstance.post(`/hd`, data);
  return res.data;
};
