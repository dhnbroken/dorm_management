import ProfileForm from 'components/Form/ProfileForm';
import StudentProfileHeader from 'components/SectionHeader/StudentProfileHeader';
import React from 'react';

const StudentProfile = () => {
  const people = {
    id: 1,
    firstName: 'Lộc',
    lastName: 'Gà',
    university: 'Trường đại học Công Nghệ Thông Tin',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    citizenId: '213123123',
    studentId: '19521952'
  };
  return (
    <div className="px-16 py-8">
      <StudentProfileHeader />
      <ProfileForm data={people} isStudent={true} />
    </div>
  );
};

export default StudentProfile;
