import * as yup from 'yup';

export const profileSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    citizenId: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .test('len', 'CMND/CCCD Phải có 9 hoặc 12 ký tự', (val) => val.length === 9 || val.length === 12),
    studentId: yup.string().required(),
    type: yup.string().default('student').required(),
    gender: yup.string().required()
  })
  .required();

export const inputProfileArray = [
  { htmlFor: 'firstName', label: 'Tên' },
  { htmlFor: 'lastName', label: 'Họ' },
  { htmlFor: 'citizenId', label: 'CMND/CCCD' },
  { htmlFor: 'studentId', label: 'MSSV' }
];
