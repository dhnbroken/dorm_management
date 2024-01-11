import { PlusIcon } from '@heroicons/react/20/solid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBill, getAllBills, updateBill } from 'API/bill';

import { getAllStudent } from 'API/user';
import { Modal, Select, Space } from 'antd';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import DatePicker from 'components/DatePicker';
import InputWithLabel from 'components/Input/InputWithLabel';
import EditIcon from 'components/icons/EditIcon';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const BillListPage = () => {
  const queryClient = useQueryClient();

  const { data: allBills } = useQuery({
    queryKey: ['all_bills'],
    queryFn: getAllBills
  });

  const { data: allUser } = useQuery({
    queryKey: ['get_all_user'],
    queryFn: getAllStudent
  });

  const [isModalEdit, setIsModalEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [newBillModal, setNewBillModal] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState();

  const [dateIn, setDateIn] = useState();
  const [dateOut, setDateOut] = useState();

  useEffect(() => {
    if (allUser) {
      const newArray = allUser?.map((user) => ({
        value: JSON.stringify(user),
        label: user.HoTen
      }));

      setUserOptions(newArray);
    }
  }, [allUser]);

  const { register, handleSubmit, reset } = useForm();

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
      title: 'Phòng',
      dataIndex: 'billDetails',
      render: (_, record) => {
        return <div className="text-center">{record.billDetails?.roomName}</div>;
      }
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'price'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => {
        return <div className="text-center">{record?.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}</div>;
      }
    },
    {
      title: 'Ngày đến hạn',
      dataIndex: 'billDetails',
      render: (_, record) => {
        return <div className="text-center">{moment(record?.billDetails?.dateOut).format('DD/MM/YYYY')}</div>;
      }
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      render: (_, record) => {
        return <div className="text-center">{moment(record.updatedAt).format('DD/MM/YYYY')}</div>;
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
              setIsModalEdit(true);
              setEditData(record);
            }}
          />
        </Space>
      )
    }
  ];

  console.log(allBills);

  const updateBillData = useMutation({
    mutationFn: updateBill,
    onSuccess: () => {
      toast.success('Thành công');
      setIsModalEdit(false);
      queryClient.invalidateQueries({ queryKey: ['all_bills'] });
      queryClient.invalidateQueries({ queryKey: ['all_rooms'] });

      setSelectedUser({});
      setDateIn('');
      setDateOut('');
      reset();
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại!');
    }
  });

  const handlePaid = () => {
    updateBillData.mutate({
      id: editData?._id,
      data: {
        status: 1
      }
    });
  };

  const handleChangeUser = (value) => {
    setSelectedUser(JSON.parse(value));
  };

  const onSubmit = (data) => {
    updateBillData.mutate({
      id: editData?._id,
      data: {
        ...data,
        billDetails: {
          ...editData.billDetails,
          dateIn: moment(data.dateIn, 'DD/MM/YYYY').toDate(),
          dateOut: moment(data.dateOut, 'DD/MM/YYYY').toDate()
        }
      }
    });
  };

  const handleCreateBill = useMutation({
    mutationFn: createBill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all_bills'] });
      queryClient.invalidateQueries({ queryKey: ['get_all_user'] });

      toast.success('Tạo thành công');
      setNewBillModal(false);
      reset();
    }
  });

  const onCreateBill = (formData) => {
    const data = {
      ...formData,
      dateIn: moment(dateIn, 'DD/MM/YYYY').toDate(),
      dateOut: moment(dateOut, 'DD/MM/YYYY').toDate(),
      roomId: selectedUser?.room?.roomId,
      status: 0,
      CMND: selectedUser?.CMND,
      userId: selectedUser?._id,
      Mssv: selectedUser?.Mssv,
      roomName: selectedUser?.room?.roomTitle
    };

    handleCreateBill.mutate({
      data
    });
  };

  return (
    <div className="p-8">
      <div className="text-xl font-semibold mb-8">Danh sách hóa đơn</div>
      <div className="text-end mb-2">
        <PrimaryButton text={'Tạo hóa đơn'} Icon={PlusIcon} onClick={() => setNewBillModal(true)} />
      </div>
      <CustomTable columns={columns} dataSource={allBills} isPagination={false} />
      <Modal open={isModalEdit} onCancel={() => setIsModalEdit(false)} footer={false}>
        <div className="text-center w-full text-xl font-semibold my-3">Sửa thông tin hóa đơn</div>
        <form className="flex justify-center flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <InputWithLabel label={'Sinh viên'} defaultValue={editData?.billDetails?.HoTen} disabled={true} />
            <InputWithLabel label={'Phòng'} defaultValue={editData?.billDetails?.roomName} disabled={true} />
            <InputWithLabel label={'Giá'} defaultValue={editData?.price} disabled />
            <InputWithLabel
              label={'Ngày bắt đầu'}
              defaultValue={moment(editData?.billDetails?.dateIn).format('DD/MM/YYYY')}
              register={register}
              registerKey={'dateIn'}
            />
            <InputWithLabel
              label={'Ngày hết hạn'}
              defaultValue={moment(editData?.billDetails?.dateOut).format('DD/MM/YYYY')}
              register={register}
              registerKey={'dateOut'}
            />
          </div>
          <div className="mt-5 sm:mt-4 flex justify-between">
            <div>
              {editData?.status === 0 && (
                <PrimaryButton
                  text={'Đã thanh toán'}
                  className={'!bg-green-500 hover:!bg-green-400'}
                  onClick={handlePaid}
                />
              )}
            </div>
            <div className="sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto
                disabled:bg-red-200 disabled:hover:bg-red-200"
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
          </div>
        </form>
      </Modal>

      <Modal open={newBillModal} onCancel={() => setNewBillModal(false)} footer={false}>
        <form className="flex justify-center flex-col gap-3" onSubmit={handleSubmit(onCreateBill)}>
          <div className="flex flex-col gap-3">
            <InputWithLabel label={'Tên hóa đơn'} register={register} registerKey={'title'} />
            <div>
              <div>Sinh viên</div>
              <Select onChange={handleChangeUser} options={userOptions} className="w-full" />
            </div>
            <InputWithLabel label={'Giá'} register={register} registerKey={'price'} />
            {/* Date In */}
            <div>
              <label>Ngày bắt đầu</label>
              <DatePicker className={'!max-w-full'} setSelectedDate={setDateIn} />
            </div>
            {/* DateOut */}
            <div>
              <label>Ngày kết thúc</label>
              <DatePicker className={'!max-w-full'} setSelectedDate={setDateOut} />
            </div>
          </div>
          <div className="mt-5 sm:mt-4 flex justify-between">
            <div className="sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto
                disabled:bg-red-200 disabled:hover:bg-red-200"
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
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BillListPage;
