import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteAccount, deleteStudent, getAllStudent, updateStudentInformation } from 'API/user';
import { Modal, Space } from 'antd';
import { DeleteButton } from 'components/Button/DeleteButton';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import InputWithLabel from 'components/Input/InputWithLabel';
import EditIcon from 'components/icons/EditIcon';
import WarningIcon from 'components/icons/Warning';
import { GlobalContextProvider } from 'context/GlobalContext';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const StudentList = () => {
  const queryClient = useQueryClient();
  const { data: studentList } = useQuery({
    queryKey: ['All_Student'],
    queryFn: getAllStudent
  });

  const { profileData } = useContext(GlobalContextProvider);

  const [isModalDelete, setIsModalDelete] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  const [isModalEdit, setIsModalEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const columns = [
    {
      title: 'STT',
      width: 50,
      align: 'center',
      render: (value, record, index) => {
        return index + 1;
      }
    },
    {
      title: 'Họ tên',
      dataIndex: 'HoTen'
    },
    {
      title: 'Phòng',
      dataIndex: 'Room',
      render: (_, record) => {
        return record?.room?.roomTitle;
      }
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'Phone'
    },
    {
      title: 'Email',
      dataIndex: 'Email'
    },
    {
      title: 'Trường',
      dataIndex: 'Truong'
    },

    {
      title: 'Ngân hàng',
      dataIndex: 'NganHang'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'DateOfBirth',
      render: (_, record) => {
        return moment(record?.DateOfBirth).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Tác vụ',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <PrimaryButton
            text="Cập nhật"
            Icon={EditIcon}
            onClick={() => {
              console.log(record);
              setIsModalEdit(true);
              setEditData(record);
            }}
          />
          <DeleteButton
            text="Xóa"
            onClick={() => {
              setIsModalDelete(true);
              setDataDelete(record);
            }}
          />
        </Space>
      )
    }
  ];

  const deleteUser = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      deleteAccountUser.mutate({
        id: dataDelete?._id
      });
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại');
    }
  });

  const deleteAccountUser = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success('Xóa thành công', { autoClose: 2000 });
      setIsModalDelete(false);
      queryClient.invalidateQueries({ queryKey: ['All_Student'] });
    }
  });

  const handleDeleteUser = (id) => {
    deleteUser.mutate({
      id: id,
      CMND: profileData?.CMND
    });
  };

  const updateUser = useMutation({
    mutationFn: updateStudentInformation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['All_Student'] });
      setIsModalEdit(false);
      onCancel();
      toast.success('Cập nhật thành công');
    }
  });

  const onSubmit = (data) => {
    updateUser.mutate({
      id: editData?._id,
      data
    });
  };

  const onCancel = () => {
    setIsModalEdit(false);
    setEditData();
    reset();
  };

  return (
    <div className="p-8">
      <div className="text-xl font-semibold mb-8">Danh sách sinh viên</div>
      <CustomTable columns={columns} dataSource={studentList} isPagination={false} />
      <Modal open={isModalDelete} onCancel={() => setIsModalDelete(false)} footer={false}>
        <div className="flex justify-center flex-col gap-3">
          <div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <div className="text-xl font-semibold leading-6 text-gray-900">Xóa sinh viên</div>
              <div className="w-full mt-4 flex justify-center">
                <div className="mx-auto flex h-32 w-32 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                  <WarningIcon className="h-28 w-28" />
                </div>
              </div>
              <div className="mt-4 text-center text-base text-black">
                Bạn chắc chắn muốn xóa <span className="font-semibold">{dataDelete?.HoTen}</span>?
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto
              disabled:bg-red-200 disabled:hover:bg-red-200"
              onClick={() => handleDeleteUser(dataDelete?._id)}
            >
              Xác nhận
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setIsModalDelete(false)}
            >
              Hủy
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={isModalEdit} onCancel={onCancel} footer={false} centered>
        <div className="text-center w-full text-xl font-semibold my-3">Sửa thông tin sinh viên</div>
        {editData && (
          <form className="flex justify-center flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <InputWithLabel
                label={'Ho tên'}
                register={register}
                registerKey={'HoTen'}
                defaultValue={editData?.HoTen}
              />
              <InputWithLabel
                label={'CMND/CCCD'}
                register={register}
                registerKey={'CMND'}
                defaultValue={editData?.CMND}
              />
              <InputWithLabel
                label={'Trường'}
                register={register}
                registerKey={'Truong'}
                defaultValue={editData?.Truong}
              />
              <InputWithLabel
                label={'Mã số sinh viên'}
                register={register}
                registerKey={'Mssv'}
                defaultValue={editData?.Mssv}
              />
              <InputWithLabel
                label={'Số điện thoại'}
                register={register}
                registerKey={'Phone'}
                defaultValue={editData?.Phone}
              />
              <InputWithLabel
                label={'Địa chỉ'}
                register={register}
                registerKey={'Address'}
                defaultValue={editData?.Address}
              />
              <InputWithLabel
                label={'Niên Khóa'}
                register={register}
                registerKey={'NienKhoa'}
                defaultValue={editData?.NienKhoa}
              />
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto
              disabled:bg-green-200 disabled:hover:bg-green-200"
              >
                Xác nhận
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => setIsModalEdit(false)}
              >
                Hủy
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default StudentList;
