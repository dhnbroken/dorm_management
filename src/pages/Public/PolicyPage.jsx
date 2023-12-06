import PolicyRevenue from 'components/Policy/PolicyRevenue';
import PolicyStudentInfo from 'components/Policy/PolicyStudentInfo';
import React from 'react';

const PolicyPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-start p-8 px-16">
      <PolicyRevenue />
      <PolicyStudentInfo />
    </div>
  );
};

export default PolicyPage;
