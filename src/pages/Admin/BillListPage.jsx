import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllBills, updateBill } from 'API/bill';
import { getAllRooms } from 'API/room';
import { Modal, Space } from 'antd';
import { DeleteButton } from 'components/Button/DeleteButton';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import InputWithLabel from 'components/Input/InputWithLabel';
import EditIcon from 'components/icons/EditIcon';
import WarningIcon from 'components/icons/Warning';
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

  const { data: roomsData } = useQuery({
    queryKey: ['all_rooms'],
    queryFn: getAllRooms
  });

  const [isModalEdit, setIsModalEdit] = useState(false);
  const [editData, setEditData] = useState({});

  const [billDetail, setBillDetail] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (allBills && roomsData) {
      const updatedBillData = allBills?.map((bill) => {
        const roomsInBill = roomsData.find((room) => room?._id === bill.RoomId);

        return { ...bill, Room: roomsInBill };
      });

      setBillDetail(updatedBillData);
    }
  }, [allBills, roomsData]);

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
      dataIndex: 'HoTen',
      render: (_, record) => {
        return <div>{record.Room?.Title}</div>;
      }
    },
    {
      title: 'Tổng cộng',
      dataIndex: 'Price'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Status'
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updatedAt',
      render: (_, record) => {
        return <div>{moment(record.updatedAt).format('DD/MM/YYYY')}</div>;
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
    },
    onError: () => {
      toast.error('Có lỗi xảy ra, xin thử lại!');
    }
  });

  const onSubmit = (data) => {
    updateBillData.mutate({
      id: editData?._id,
      data: {
        ...data
      }
    });
  };
  return (
    <div className="p-8">
      <div className="text-xl font-semibold mb-8">Danh sách hóa đơn</div>
      <CustomTable columns={columns} dataSource={billDetail} isPagination={false} />
      <Modal open={isModalEdit} onCancel={() => setIsModalEdit(false)} footer={false}>
        <div className="text-center w-full text-xl font-semibold my-3">Sửa thông tin hóa đơn</div>
        <form className="flex justify-center flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <InputWithLabel label={'Phòng'} defaultValue={editData?.Room?.Title} disabled={true} />
            <InputWithLabel label={'Giá'} register={register} registerKey={'Price'} defaultValue={editData?.Price} />
            <div>
              <label>Trạng thái</label>
              <select
                className={`custom_select_field !max-w-full disabled:bg-slate-100/70 disabled:cursor-not-allowed`}
                defaultValue={editData?.Status}
                {...register('Status')}
              >
                <option>Chưa thanh toán</option>
                <option>Đã thanh toán</option>
              </select>
            </div>
          </div>
          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
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
        </form>
      </Modal>
    </div>
  );
};

export default BillListPage;
