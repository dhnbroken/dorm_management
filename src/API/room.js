const { default: axiosInstance } = require('./axiosInstance');

export const getAllRooms = async () => {
  const res = await axiosInstance.get('/rooms');
  return res.data;
};

export const getDormitory = async () => {
  const res = await axiosInstance.get('/dormitorys');
  return res.data;
};

export const getDormitoryRoom = async (id) => {
  const res = await axiosInstance.get(`/dormitorys/room/${id}`);
  return res.data;
};
