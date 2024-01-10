import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllRequestExtendChange, updateRequestExtendRoom } from 'API/requests';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import moment from 'moment';
import React from 'react';

const ExtendRequest = () => {
  const { data: extendRequest, refetch } = useQuery({
    queryKey: ['all_extend'],
    queryFn: getAllRequestExtendChange
  });

  console.log(extendRequest);

  const getStatus = (statusId) => {
    switch (statusId) {
      case 0:
        return 'Chưa duyệt';
      case 1:
        return 'Đã duyệt';
      case 2:
        return 'Đã từ chối';
      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Phòng',
      dataIndex: 'roomTitle',
      align: 'center'
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'userDetail.HoTen',
      render: (_, record) => {
        return record.userDetail.HoTen;
      }
    },
    {
      title: 'Hạn cuối',
      dataIndex: 'dateOut',
      render: (_, record) => {
        return moment(record?.dateOut).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Ngày muốn gia hạn',
      dataIndex: 'newDateOut',
      render: (_, record) => {
        return moment(record?.newDateOut).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => {
        return getStatus(record.requestStatus);
      }
    },
    {
      title: 'Tác vụ',
      key: 'action',
      render: (_, record) => {
        return (
          record.requestStatus === 0 && (
            <div className="flex gap-3 items-center">
              <PrimaryButton text={'Duyệt'} onClick={() => updateRequest(record._id, record.userId, 1)} />
              <PrimaryButton
                text={'Từ chối'}
                className={'!bg-red-500 !hover:bg-red-400'}
                onClick={() => updateRequest(record._id, record.userId, 2)}
              />
            </div>
          )
        );
      }
    }
  ];

  const updateRequest = (id, userId, requestStatus) => {
    return handleUpdateRequest.mutate({
      id,
      data: {
        userId,
        requestStatus
      }
    });
  };

  const handleUpdateRequest = useMutation({
    mutationFn: updateRequestExtendRoom,
    onSuccess: () => {
      refetch();
    }
  });

  return <CustomTable dataSource={extendRequest} columns={columns} isPagination={false} />;
};

export default ExtendRequest;
