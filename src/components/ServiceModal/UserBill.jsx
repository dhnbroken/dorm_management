import { useQuery } from '@tanstack/react-query';
import { getBillDetail } from 'API/bill';
import CustomTable from 'components/CustomTable';
import { GlobalContextProvider } from 'context/GlobalContext';
import moment from 'moment';
import React, { useContext } from 'react';

const UserBill = ({ title }) => {
  const { profileData } = useContext(GlobalContextProvider);

  const { data: billDetail } = useQuery({
    queryFn: () => getBillDetail({ CMND: profileData?.CMND }),
    queryKey: ['bill_detail'],
    retry: 1
  });

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
      dataIndex: 'Mssv',
      render: (value, record, index) => {
        return record?.billDetails?.Mssv;
      }
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      render: (_, record) => {
        return record?.billDetails?.roomName;
      }
    },
    {
      title: 'Ngày vào',
      dataIndex: 'DateIn',
      render: (_, record) => {
        return <div>{moment(record?.billDetails?.dateIn).format('DD/MM/YYYY')}</div>;
      }
    },
    {
      title: 'Ngày hết hạn',
      dataIndex: 'dateOut',
      render: (_, record) => {
        return <div>{moment(record?.billDetails?.dateOut).format('DD/MM/YYYY')}</div>;
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => {
        return (
          <div className={`${record?.status === 0 ? 'text-red-500' : 'text-green-500'}`}>
            {record?.status === 0 ? 'Chưa thanh toán' : 'Đã thanh toán'}
          </div>
        );
      }
    }
  ];
  return (
    <div className="text-xl font-semibold text-center w-full">
      {title}
      <CustomTable columns={columns} dataSource={billDetail} isPagination={false} />
    </div>
  );
};

export default UserBill;
