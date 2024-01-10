import React from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';

const ProfileCard = ({ person }) => {
  return (
    <>
      <div className="flex flex-1 flex-col p-8">
        <img
          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
          src={
            person?.imageUrl ||
            'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80'
          }
          alt=""
        />
        <h3 className="mt-6 text-sm font-medium text-gray-900">{person.HoTen}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-sm text-gray-500">{person.Truong}</dd>
          <dt className="sr-only">Role</dt>
          <dd className="mt-3">
            <div className="text-xs font-medium">
              <p>MSSV: {person.Mssv}</p>
              <p>CCCD: {person.CMND}</p>
            </div>
          </dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <a
              href={`mailto:${person.Email}`}
              className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
            >
              <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Email
            </a>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <a
              href={`tel:${person.Phone}`}
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
