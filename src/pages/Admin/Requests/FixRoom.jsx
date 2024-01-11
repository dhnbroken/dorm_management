import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllRequestFixRoom, updateRequestFixRoom } from 'API/requests';
import { getColorStatus } from 'DB';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import React from 'react';

const FixRoomRequest = () => {
  const { data: fixRequests, refetch } = useQuery({
    queryKey: ['all_fix_request'],
    queryFn: getAllRequestFixRoom
  });

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
      dataIndex: 'room?.roomTitle',
      align: 'center',
      render: (_, record) => {
        return record?.room?.roomTitle;
      }
    },
    {
      title: 'Tên sinh viên',
      dataIndex: 'userDetail.HoTen',
      render: (_, record) => {
        return record.userDetail.HoTen;
      }
    },
    {
      title: 'Tin nhắn',
      dataIndex: 'note'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (_, record) => {
        return <div className={`${getColorStatus(record?.requestStatus)}`}>{getStatus(record.requestStatus)}</div>;
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
    mutationFn: updateRequestFixRoom,
    onSuccess: () => {
      refetch();
    }
  });

  return <CustomTable dataSource={fixRequests} columns={columns} isPagination={false} />;
};

export default FixRoomRequest;
