import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllRequestChange, updateRequestChangeRoom, updateRequestCheckout } from 'API/requests';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import React from 'react';

const ChangeRoomRequest = () => {
  const { data: changeRequests, refetch } = useQuery({
    queryKey: ['all_change_room'],
    queryFn: getAllRequestChange
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
      title: 'Phòng gốc',
      dataIndex: 'originRoom.roomTitle',
      align: 'center',
      render: (_, record) => {
        return record?.originRoom?.roomTitle;
      }
    },
    {
      title: 'Phòng muốn chuyển',
      dataIndex: 'toRoom.roomTitle',
      align: 'center',
      render: (_, record) => {
        return record?.toRoom?.roomTitle;
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
    mutationFn: updateRequestChangeRoom,
    onSuccess: () => {
      refetch();
    }
  });

  return (
    <CustomTable dataSource={changeRequests} columns={columns} isPagination={false}>
      CheckoutRequest
    </CustomTable>
  );
};

export default ChangeRoomRequest;
