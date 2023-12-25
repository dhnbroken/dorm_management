import { BarsArrowUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useQuery } from '@tanstack/react-query';
import { getAllRooms, getDormitory, getDormitoryRoom } from 'API/room';
import { useEffect, useState } from 'react';

export default function SectionHeaderWithSearch({ onSearch }) {
  const { data: dormDataReturned } = useQuery({
    queryKey: ['dorms'],
    queryFn: getDormitory
  });

  const { data: roomsData } = useQuery({
    queryKey: ['rooms'],
    queryFn: getAllRooms
  });

  const [dormData, setDormData] = useState([]);

  useEffect(() => {
    if (dormDataReturned && roomsData) {
      const updatedDormData = dormDataReturned.map((dorm) => {
        const roomIds = dorm.Room || [];
        const roomsInDorm = roomsData.filter((room) => roomIds.includes(room._id));
        return { ...dorm, Room: roomsInDorm };
      });

      setDormData(updatedDormData);
    }
  }, [dormDataReturned, roomsData]);

  console.log(dormData);

  return (
    <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
      <h3 className="text-base font-semibold leading-6 text-gray-900">Danh sách phòng</h3>
      <div className="mt-3 sm:ml-4 sm:mt-0">
        <label htmlFor="mobile-search-candidate" className="sr-only">
          Tìm kiếm
        </label>
        <label htmlFor="desktop-search-candidate" className="sr-only">
          Tìm kiếm
        </label>
        <div className="flex rounded-md shadow-sm">
          <div className="relative flex-grow focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="mobile-search-candidate"
              id="mobile-search-candidate"
              className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
              placeholder="Search"
            />
            <input
              type="text"
              name="desktop-search-candidate"
              id="desktop-search-candidate"
              className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
              placeholder="Tìm phòng"
            />
          </div>
          <button
            type="button"
            onClick={onSearch}
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <BarsArrowUpIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            Lọc
            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
