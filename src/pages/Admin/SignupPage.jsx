import ProfileForm from 'components/Form/ProfileForm';
import React from 'react';

const SignupPage = () => {
  return (
    <div className="px-16 py-8">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Thông tin cá nhân</h3>
      </div>
      <ProfileForm />
    </div>
  );
};

export default SignupPage;
