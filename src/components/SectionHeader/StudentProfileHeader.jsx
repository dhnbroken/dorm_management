import ChangePassModal from 'components/Modal/ChangePass';
import React, { useState } from 'react';

const StudentProfileHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Thông tin sinh viên</h3>
        <div className="mt-3 sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Đổi mật khẩu
          </button>
        </div>
      </div>
      <ChangePassModal open={open} setOpen={setOpen} />
    </>
  );
};

export default StudentProfileHeader;
