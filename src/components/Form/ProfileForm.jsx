import React from 'react';

import { PhotoIcon } from '@heroicons/react/24/solid';
import { inputProfileArray, profileSchema } from 'DB';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const InputProfile = ({
  htmlFor,
  type = 'text',
  placeholder = '',
  register,
  label,
  errors,
  defaultValue,
  isStudent = false
}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          defaultValue={defaultValue ? defaultValue[htmlFor] : ''}
          disabled={isStudent}
          className={`custom_input_field ${isStudent && 'bg-slate-100/70 cursor-not-allowed'}`}
          {...register(htmlFor)}
        />
      </div>
      <p className="text-red-500 text-xs pt-1.5">{errors[htmlFor]?.message}</p>
    </>
  );
};

const ProfileForm = ({ data, isStudent }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(profileSchema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="space-y-10">
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <img src={data?.imageUrl} alt="" />
          </div>

          <form
            className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-4 py-6 sm:p-8">
              <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {inputProfileArray.map((item) => (
                  <div className="sm:col-span-3" key={item.label}>
                    <InputProfile
                      htmlFor={item.htmlFor}
                      label={item.label}
                      type={item.type}
                      register={register}
                      errors={errors}
                      defaultValue={data}
                      isStudent={isStudent}
                    />
                  </div>
                ))}

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Loại
                  </label>
                  <div className="mt-2">
                    <select
                      {...register('type')}
                      disabled={isStudent}
                      className={`custom_select_field ${isStudent && 'bg-slate-100/70 cursor-not-allowed'}`}
                    >
                      <option>Sinh viên</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                    Giới tính
                  </label>
                  <div className="mt-2">
                    <select
                      {...register('gender')}
                      disabled={isStudent}
                      className={`custom_select_field ${isStudent && 'bg-slate-100/70 cursor-not-allowed'}`}
                    >
                      <option>Nam</option>
                      <option>Nữ</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                    Ảnh
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative flex-1 cursor-pointer rounded-md  bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          Tải ảnh lên
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, JPEG</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isStudent}
                className={`custom_save_button ${isStudent && '!bg-indigo-500'}`}
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
