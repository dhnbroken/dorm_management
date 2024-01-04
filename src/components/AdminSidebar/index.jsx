import { Disclosure } from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', to: '/admin', icon: HomeIcon, current: true, value: 'dashboard' },
  {
    name: 'Sinh viên',
    icon: UsersIcon,
    current: false,
    value: 'student',
    children: [
      { name: 'Danh sách sinh viên', to: '/admin/student/list' },
      { name: 'Thêm sinh viên', to: '/admin/student/signup' }
    ]
  },
  {
    name: 'Quản lý phòng',
    icon: FolderIcon,
    current: false,
    value: 'room',
    children: [
      { name: 'Danh sách phòng', to: '/admin/room/list' },
      { name: 'Thêm phòng', to: '/admin/room/add' }
    ]
  },
  {
    name: 'Quản lý hóa đơn',
    icon: FolderIcon,
    current: false,
    value: 'room',
    children: [{ name: 'Danh sách hóa đơn', to: '/admin/bill/list' }]
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function AdminSidebar() {
  const [active, setActive] = useState('dashboard');
  const navigate = useNavigate();
  return (
    <div className="hidden lg:flex grow flex-col gap-y-2 overflow-y-auto border-r border-gray-200 bg-white px-6">
      <div className="flex h-16 shrink-0 items-center">
        <Link to={'/'} className="flex w-full justify-center items-center font-bold text-xl text-sky-500">
          {/* <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          DORM
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li className="cursor-pointer">
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name} onClick={() => setActive(item.value)}>
                  {!item.children ? (
                    <Link
                      to={item.to}
                      className={classNames(
                        item.value === active ? 'bg-gray-50' : 'hover:bg-gray-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-gray-700'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ) : (
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.value === active ? 'bg-gray-50' : 'hover:bg-gray-50',
                              'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                            {item.name}
                            <ChevronRightIcon
                              className={classNames(
                                open ? 'rotate-90 text-gray-500' : 'text-gray-400',
                                'ml-auto h-5 w-5 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel as="ul" className="mt-1 px-2">
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                <Disclosure.Button
                                  as="button"
                                  onClick={() => navigate(subItem.to)}
                                  className={classNames(
                                    subItem.current ? 'bg-gray-50' : 'hover:bg-gray-50',
                                    'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 w-full text-start text-gray-700'
                                  )}
                                >
                                  {subItem.name}
                                </Disclosure.Button>
                              </li>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>
          <li className="-mx-6 mt-auto">
            <Link
              to="/"
              className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
            >
              <img
                className="h-8 w-8 rounded-full bg-gray-50"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span className="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
