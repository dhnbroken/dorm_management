import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRequestExtendChange, requestExtendRoom } from 'API/requests';
import { getRoom } from 'API/room';
import { Modal } from 'antd';
import CustomTable from 'components/CustomTable';

import InputWithLabel from 'components/Input/InputWithLabel';
import { GlobalContextProvider } from 'context/GlobalContext';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getColorHistory, getStatus } from 'utils/shared';

const ExtendForm = ({ title, onCancel }) => {
  const { profileData } = useContext(GlobalContextProvider);
  const queryClient = useQueryClient();

  const [openHistory, setOpenHistory] = useState(false);
  const { handleSubmit } = useForm();

  const [newDateOut, setNewDateOut] = useState(1);

  const { data: roomData } = useQuery({
    queryKey: ['get_room_by_id'],
    queryFn: () => getRoom(profileData?.room?.roomId)
  });

  const onSubmit = () => {
    if (newDateOut) {
      const data = {
        userId: profileData._id,
        userDetail: {
          CMND: profileData?.CMND,
          HoTen: profileData?.HoTen,
          Mssv: profileData?.Mssv
        },
        extendPrice: roomData?.Price * newDateOut,
        roomId: profileData?.room?.roomId,
        roomTitle: profileData?.room?.roomTitle,
        dateOut: profileData?.room?.dateOut,
        newDateOut: moment(profileData?.room?.dateOut).add(newDateOut, 'months').toDate()
      };

      handleExtend.mutate({
        data
      });
    }
  };

  const handleExtend = useMutation({
    mutationFn: requestExtendRoom,
    onSuccess: () => {
      toast.success('Yêu cầu trả phòng thành công');
      onCancel();
      queryClient.invalidateQueries({ queryKey: ['extend_request_by_user'] });
    }
  });

  const { data: extendRequest } = useQuery({
    queryKey: ['extend_request_by_user'],
    queryFn: () => getRequestExtendChange({ id: profileData?._id })
  });

  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: '50px',
      align: 'center',
      render: (_, record, i) => {
        return i + 1;
      }
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      align: 'center'
    },
    {
      title: 'Phòng',
      dataIndex: 'roomTitle',
      width: '120px',
      align: 'center'
    },
    {
      title: 'Ngày đến hạn cũ',
      dataIndex: 'dateOut',
      width: '150px',
      align: 'center',
      render: (_, record) => {
        return moment(record?.dateOut).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Ngày đến hạn mới',
      dataIndex: 'dateOut',
      width: '150px',
      align: 'center',
      render: (_, record) => {
        return moment(record?.newDateOut).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'requestStatus',
      align: 'center',
      render: (_, record) => {
        return <div className={`${getColorHistory(record?.requestStatus)}`}>{getStatus(record?.requestStatus)}</div>;
      }
    },
    {
      title: 'Lý do từ chối',
      dataIndex: 'rejectReason',
      width: '150px'
    }
  ];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center flex-col gap-8 px-8">
        <div className="font-semibold text-xl">{title}</div>
        <div className="w-full flex flex-col gap-2">
          <InputWithLabel label="CCCD" defaultValue={profileData?.CMND} disabled />
          <InputWithLabel label="Tên sinh viên" defaultValue={profileData?.HoTen} disabled />
          <InputWithLabel label="Phòng" defaultValue={profileData?.room?.roomTitle} disabled />
          <InputWithLabel
            label="Ngày đến hạn"
            defaultValue={moment(profileData?.room?.dateOut).format('DD/MM/YYYY')}
            disabled
          />
          <div className="flex flex-col gap-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">Muốn gia hạn</label>
            <select
              className={`custom_select_field w-full !max-w-full disabled:bg-slate-100/70 disabled:cursor-not-allowed`}
              onChange={(e) => setNewDateOut(e.target.value)}
            >
              <option value={1}>1 tháng</option>
              <option value={3}>3 tháng</option>
              <option value={6}>6 tháng</option>
            </select>
          </div>
          {/* <TextAreaField label="Note" rows={3} className="w-full rounded" register={register} registerKey={'note'} /> */}
        </div>
        <div className="flex justify-between w-full">
          <button
            type="button"
            onClick={() => setOpenHistory(true)}
            className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Lịch sử
          </button>
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Gửi
          </button>
        </div>
      </form>

      <Modal open={openHistory} footer={false} onCancel={() => setOpenHistory(false)} width={800}>
        <div className="w-full text-center text-xl font-semibold">Lịch sử</div>
        <CustomTable columns={columns} dataSource={extendRequest} isPagination={false} />
      </Modal>
    </>
  );
};

export default ExtendForm;
