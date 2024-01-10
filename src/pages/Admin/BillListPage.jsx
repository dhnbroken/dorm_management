import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBills, updateBill } from 'API/bill';
import { getAllRooms } from 'API/room';
import { Modal, Space } from 'antd';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
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

  const updateBillData = useMutation({
    mutationFn: updateBill,
    onSuccess: () => {
      toast.success('Thành công');
      setIsModalEdit(false);
      queryClient.invalidateQueries({ queryKey: ['all_bills'] });
      queryClient.invalidateQueries({ queryKey: ['all_rooms'] });

      reset();
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại!');
    }
  });

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

  const handlePaid = () => {
    updateBillData.mutate({
      id: editData?._id,
      data: {
        status: 1
      }
    });
  };
  return (
    <div className="p-8">
      <div className="text-xl font-semibold mb-8">Danh sách hóa đơn</div>
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
    </div>
  );
};

export default BillListPage;
