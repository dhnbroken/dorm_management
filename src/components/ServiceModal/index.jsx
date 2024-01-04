import React, { useContext, useEffect, useState } from 'react';

import Modal from 'antd/es/modal/Modal';
import InputWithLabel from 'components/Input/InputWithLabel';
import TextAreaField from 'components/Input/AreaWithLabel';
import { GlobalContextProvider } from 'context/GlobalContext';

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
      default:
        break;
    }
  }, [keyService]);

  return (
    <Modal open={isOpen} onCancel={onCancel} footer={false} width={600}>
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
    </Modal>
  );
};

export default ServiceModal;
