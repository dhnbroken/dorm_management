import RoomList from 'components/RoomList';
import SectionHeaderWithSearch from 'components/SectionHeader/SectionHeaderWithSearch';
import React from 'react';

const RoomListPage = () => {
  return (
    <div className="p-16">
      <SectionHeaderWithSearch />
      <RoomList />
    </div>
  );
};

export default RoomListPage;
