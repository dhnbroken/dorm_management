const { default: axiosInstance } = require('./axiosInstance');

export const getAllStudent = async () => {
  const res = await axiosInstance.get('/user');
  return res.data;
};

export const createStudentInformation = async (body) => {
  const res = await axiosInstance.post('/User', body);
  return res.data;
};

export const createStudentAccount = async (body) => {
  const res = await axiosInstance.post('/auth/register', body);
  return res.data;
};

export const getProfileInformation = async ({ userId }) => {
  const res = await axiosInstance.get(`/User/${userId}`, { params: { id: userId } });
  return res.data;
};

export const deleteStudent = async ({ id, CMND }) => {
  console.log(id);
  const res = await axiosInstance.delete(`/user/${id}`, { params: { id: id }, data: { CMND } });
  return res.data;
};
