import React, { useContext, useEffect, useState } from 'react';

import Modal from 'antd/es/modal/Modal';
import InputWithLabel from 'components/Input/InputWithLabel';
import TextAreaField from 'components/Input/AreaWithLabel';
import { GlobalContextProvider } from 'context/GlobalContext';
import { useQuery } from '@tanstack/react-query';
import { getBillDetail } from 'API/bill';
import CustomTable from 'components/CustomTable';
import moment from 'moment';
import { getAllRooms } from 'API/room';

const ServiceModal = ({ keyService, isOpen, onCancel }) => {
  const [title, setTitle] = useState('');

  const { profileData } = useContext(GlobalContextProvider);

  useEffect(() => {
    switch (keyService) {
      case '1':
        setTitle('Trả phòng');
        break;
      case '2':
        setTitle('Chuyển phòng');
        break;
      case '3':
        setTitle('Sửa phòng');
        break;
      case '4':
        setTitle('Xem hóa đơn');
        break;
      default:
        break;
    }
  }, [keyService]);

  const { data: billDetail } = useQuery({
    queryFn: () => getBillDetail({ CMND: profileData?.CMND }),
    queryKey: ['bill_detail']
  });

  const { data: roomsData } = useQuery({
    queryKey: ['all_rooms_bill'],
    queryFn: getAllRooms
  });

  const [combineData, setCombineData] = useState([]);

  useEffect(() => {
    if (billDetail && roomsData) {
      // Hàm để lấy thông tin phòng dựa trên _id của phòng
      const getRoomById = (roomId) => {
        return roomsData.find((room) => room._id === roomId);
      };

      // Hàm để kết hợp thông tin hóa đơn với thông tin phòng
      const combineBillWithRoom = (bill) => {
        const billWithRoom = { ...bill }; // Tạo một bản sao của hóa đơn để tránh sửa đổi dữ liệu gốc

        // Lấy thông tin phòng dựa trên RoomId của hóa đơn
        const room = getRoomById(bill.RoomId);

        // Kiểm tra xem có phòng không
        if (room) {
          // Thêm thông tin phòng vào hóa đơn
          billWithRoom.room = room;
        }

        return billWithRoom;
      };

      // Áp dụng hàm combineBillWithRoom cho tất cả hóa đơn trong mảng bills
      const billsWithRooms = billDetail.map((bill) => combineBillWithRoom(bill));
      setCombineData(billsWithRooms);
    }
  }, [billDetail, roomsData]);

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
      title: 'MSSV',
      dataIndex: 'MSSV'
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      render: (_, record) => {
        return record?.room?.Title;
      }
    },
    {
      title: 'Ngày vào',
      dataIndex: 'DateIn',
      render: (_, record) => {
        return <div>{moment(record.DateIn).format('DD/MM/YYYY')}</div>;
      }
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'DateOut',
      render: (_, record) => {
        return <div>{moment(record.DateOut).format('DD/MM/YYYY')}</div>;
      }
    }
  ];

  return (
    <Modal open={isOpen} onCancel={onCancel} footer={false} width={title !== 'Xem hóa đơn' ? 800 : 600}>
      {title !== 'Xem hóa đơn' ? (
        <div className="flex justify-center items-center flex-col gap-8 px-8">
          <div className="font-semibold text-xl">{title}</div>
          <div className="w-full flex flex-col gap-2">
            <InputWithLabel label="CCCD" defaultValue={profileData?.CMND} disabled />
            <InputWithLabel label="Tên sinh viên" defaultValue={profileData?.HoTen} disabled />
            <InputWithLabel label="Phòng" defaultValue={'Phòng'} />
            <InputWithLabel label="Tầng" defaultValue={'Tầng'} />
            <TextAreaField label="Note" rows={3} className="w-full rounded" />
          </div>
          <div className="flex justify-between w-full">
            <button className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
              Lịch sử
            </button>
            <button className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
              Gửi
            </button>
          </div>
        </div>
      ) : (
        <div className="text-xl font-semibold text-center w-full">
          {title}
          <CustomTable columns={columns} dataSource={combineData} isPagination={false} />
        </div>
      )}
    </Modal>
  );
};

export default ServiceModal;
