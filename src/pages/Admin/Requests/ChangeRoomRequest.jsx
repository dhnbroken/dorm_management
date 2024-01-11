import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllRequestChange, updateRequestChangeRoom } from 'API/requests';
import { getColorStatus } from 'DB';
import { PrimaryButton } from 'components/Button/PrimaryButton';
import CustomTable from 'components/CustomTable';
import SectionHeaderWithSearch from 'components/SectionHeader/SectionHeaderWithSearch';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'utils/hook/useDebounce';

const ChangeRoomRequest = () => {
  const { data: changeRequests, refetch } = useQuery({
    queryKey: ['all_change_room'],
    queryFn: getAllRequestChange
  });

  const [dataQuery, setDataQuery] = useState([]);
  const [query, setQuery] = useState('');
  const debouncedValue = useDebounce(query, 500);

  useEffect(() => {
    changeRequests && setDataQuery(changeRequests);
  }, [changeRequests]);

  useEffect(() => {
    if (changeRequests) {
      let updatedList = [...changeRequests];
      updatedList = updatedList?.filter((item) => {
        return item?._id.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      });
      setDataQuery(updatedList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

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
    mutationFn: updateRequestChangeRoom,
    onSuccess: () => {
      refetch();
    }
  });

  return (
    <div>
      <SectionHeaderWithSearch title={'Danh sách đơn đổi phòng'} setQuery={setQuery} placeholder={'Tìm đơn'} />
      <CustomTable dataSource={dataQuery} columns={columns} isPagination={false} />
    </div>
  );
};

export default ChangeRoomRequest;
