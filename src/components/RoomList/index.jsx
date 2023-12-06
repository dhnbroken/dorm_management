import { UsersIcon } from '@heroicons/react/24/outline';
import { roomList } from 'DB';
import React from 'react';
import { Link } from 'react-router-dom';

export default function RoomList() {
  return (
    <ul className="divide-y divide-gray-100">
      {roomList.map((floor) => (
        <div key={floor.id} className="border-b border-gray-200 pb-5">
          <div className="text-lg font-semibold mt-3">{floor.title}</div>
          {floor.rooms.length &&
            floor.rooms.map((room) => (
              <li
                key={room.id}
                className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
              >
                <div>
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <Link to={`/admin/room/${room.id}`} className="hover:underline">
                      {room.title}
                    </Link>
                  </p>
                  <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p>
                      <time dateTime={room.dateTime}>{room.date}</time>
                    </p>
                  </div>
                </div>
                <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
                  <div className="flex -space-x-0.5">
                    <dt className="sr-only">Commenters</dt>
                    {room.commenters.map((commenter) => (
                      <dd key={commenter.id}>
                        <img
                          className="h-6 w-6 rounded-full bg-gray-50 ring-2 ring-white"
                          src={commenter.imageUrl}
                          alt={commenter.name}
                        />
                      </dd>
                    ))}
                  </div>
                  <div className="flex w-16 gap-x-2.5">
                    <dt>
                      <span className="sr-only">Total comments</span>
                      <UsersIcon
                        className={`h-6 w-6 text-gray-400 ${
                          room.members === room.typeRoom ? 'text-red-500' : 'text-green-500'
                        }`}
                        aria-hidden="true"
                      />
                    </dt>
                    <dd
                      className={`text-sm leading-6 text-gray-900 ${
                        room.members === room.typeRoom ? 'text-red-500' : 'text-green-500'
                      }`}
                    >{`${room.members}/${room.typeRoom}`}</dd>
                  </div>
                </dl>
              </li>
            ))}
        </div>
      ))}
    </ul>
  );
}
