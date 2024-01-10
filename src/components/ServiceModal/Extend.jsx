import { useMutation } from '@tanstack/react-query';
import { requestExtendRoom } from 'API/requests';
import DatePicker from 'components/DatePicker';
import InputWithLabel from 'components/Input/InputWithLabel';
import { GlobalContextProvider } from 'context/GlobalContext';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ExtendForm = ({ title, onCancel }) => {
  const { profileData } = useContext(GlobalContextProvider);

  const { handleSubmit } = useForm();

  const [newDateOut, setNewDateOut] = useState();

  console.log(newDateOut);

  const onSubmit = () => {
    if (newDateOut) {
      const data = {
        userId: profileData._id,
        userDetail: {
          CMND: profileData?.CMND,
          HoTen: profileData?.HoTen
        },
        roomId: profileData?.room?.roomId,
        roomTitle: profileData?.room?.roomTitle,
        dateOut: profileData?.room?.dateOut,
        newDateOut: moment(newDateOut, 'DD/MM/YYYY').toDate()
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
    }
  });

  return (
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
          <label className="block text-sm font-medium leading-6 text-gray-900">Ngày muốn gia hạn</label>
          <DatePicker setSelectedDate={setNewDateOut} className={'!max-w-full'} />
        </div>
        {/* <TextAreaField label="Note" rows={3} className="w-full rounded" register={register} registerKey={'note'} /> */}
      </div>
      <div className="flex justify-between w-full">
        <button
          type="button"
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
  );
};

export default ExtendForm;
