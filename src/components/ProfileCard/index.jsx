import React from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';

const ProfileCard = ({ person }) => {
  return (
    <>
      <div className="flex flex-1 flex-col p-8">
        <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={person.imageUrl} alt="" />
        <h3 className="mt-6 text-sm font-medium text-gray-900">{person.name}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-sm text-gray-500">{person.university}</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <div className="text-xs font-medium">
              <p>MSSV: {person.studentId}</p>
              <p>CCCD: {person.citizenId}</p>
            </div>
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${person.email}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Email
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:${person.telephone}`}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Call
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
