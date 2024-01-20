import { Modal, Tabs } from 'antd';
import ChangeBankingForm from 'components/Form/ChangeBankingForm';
import ChangePhoneForm from 'components/Form/ChangePhoneForm';
import ChangePassModal from 'components/Modal/ChangePass';
import React, { useState } from 'react';

const StudentProfileHeader = () => {
  const [open, setOpen] = useState(false);
  const [openChangeInfo, setOpenChangeInfo] = useState(false);

  const items = [
    {
      key: '1',
      label: 'Tài khoản ngân hàng',
      children: <ChangeBankingForm />
    },
    {
      key: '2',
      label: 'Số điện thoại',
      children: <ChangePhoneForm />
    }
  ];

  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Thông tin sinh viên</h3>
        <div className="mt-3 sm:ml-4 sm:mt-0 flex gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đổi mật khẩu
          </button>

          <button
            type="button"
            onClick={() => setOpenChangeInfo(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đổi thông tin tài khoản
          </button>
        </div>
      </div>
      <ChangePassModal open={open} setOpen={setOpen} />
      <Modal open={openChangeInfo} onCancel={() => setOpenChangeInfo(false)} footer={false}>
        <Tabs defaultActiveKey="1" items={items} />
      </Modal>
    </>
  );
};

export default StudentProfileHeader;
