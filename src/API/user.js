const { default: axiosInstance } = require('./axiosInstance');

export const createStudentInformation = async (body) => {
  const res = await axiosInstance.post('/User', body);
  return res.data;
};

export const createStudentAccount = async (body) => {
  const res = await axiosInstance.post('/auth/register', body);
  return res.data;
};
