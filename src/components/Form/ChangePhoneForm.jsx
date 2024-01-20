import { useMutation } from '@tanstack/react-query';
import { getProfileInformation, updateStudentInformation } from 'API/user';
import InputWithLabel from 'components/Input/InputWithLabel';
import { GlobalContextProvider } from 'context/GlobalContext';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const ChangePhoneForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { profileData, setDataUser } = useContext(GlobalContextProvider);

  const getCurrentUser = async (userId) => {
    try {
      const res = await getProfileInformation({ userId });
      setDataUser(res);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateUser = useMutation({
    mutationFn: updateStudentInformation,
    onSuccess: () => {
      toast.success('Đổi thành công');
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      getCurrentUser(currentUser._id);
      //   setOpenChangeBank(false);
      //   setOpenChangePhone(false);
      reset();
    }
  });
  const onSubmit = (formData) => {
    handleUpdateUser.mutate({
      id: profileData._id,
      data: formData
    });
  };
  return (
    <div>
      <div className="text-lg font-semibold w-full text-center">Đổi số điện thoại</div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <div className="mt-2">
          <InputWithLabel label={'Số điện thoại hiện tại'} disabled defaultValue={profileData?.Phone} />
          <InputWithLabel label={'Số điện thoại mới'} register={register} registerKey={'Phone'} />
        </div>

        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default ChangePhoneForm;
