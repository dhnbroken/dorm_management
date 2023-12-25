import axiosInstance from './axiosInstance';

export const login = async (body) => {
  const response = await axiosInstance.post(`/auth/login`, body);
  return response.data;
};
