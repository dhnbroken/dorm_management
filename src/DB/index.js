import * as yup from 'yup';

export const profileSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    citizenId: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .test('len', 'CMND/CCCD Phải có 9 hoặc 12 ký tự', (val) => val.length === 9 || val.length === 12),
    studentId: yup.string().required(),
    type: yup.string().default('student').required(),
    gender: yup.string().required()
  })
  .required();

export const inputProfileArray = [
  { htmlFor: 'firstName', label: 'Tên' },
  { htmlFor: 'lastName', label: 'Họ' },
  { htmlFor: 'citizenId', label: 'CMND/CCCD' },
  { htmlFor: 'studentId', label: 'MSSV' }
];

export const roomList = [
  {
    id: 1,
    title: 'Tầng 1',
    rooms: [
      {
        id: 101,
        title: 'Phòng 101',
        typeRoom: 6,
        members: 5,
        date: 'Cả năm (2022 - 2023)',
        dateTime: '2023-01-23T22:34Z',
        status: 'active',
        totalComments: 24,
        commenters: [
          {
            id: 12,
            name: 'Emma Dorsey',
            imageUrl:
              'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 6,
            name: 'Tom Cook',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 4,
            name: 'Lindsay Walton',
            imageUrl:
              'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 16,
            name: 'Benjamin Russel',
            imageUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 23,
            name: 'Hector Gibbons',
            imageUrl:
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        ]
      },
      {
        id: 102,
        title: 'Phòng 102',
        typeRoom: 4,
        members: 3,
        date: 'Cả năm (2022 - 2023)',
        dateTime: '2023-01-23T19:20Z',
        status: 'active',
        totalComments: 6,
        commenters: [
          {
            id: 13,
            name: 'Alicia Bell',
            imageUrl:
              'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 16,
            name: 'Benjamin Russel',
            imageUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 3,
            name: 'Dries Vincent',
            imageUrl:
              'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        ]
      },
      {
        id: 103,
        title: 'Phòng 103',
        typeRoom: 4,
        members: 4,
        date: 'Cả năm (2022 - 2023)',
        dateTime: '2023-01-22T12:59Z',
        status: 'resolved',
        totalComments: 22,
        commenters: [
          {
            id: 19,
            name: 'Lawrence Hunter',
            imageUrl:
              'https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 21,
            name: 'Angela Fisher',
            imageUrl:
              'https://images.unsplash.com/photo-1501031170107-cfd33f0cbdcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 14,
            name: 'Jenny Wilson',
            imageUrl:
              'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 16,
            name: 'Benjamin Russel',
            imageUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Tầng 2',
    rooms: [
      {
        id: 201,
        title: 'Phòng 201',
        typeRoom: 4,
        members: 2,
        date: 'Cả năm (2022 - 2023)',
        dateTime: '2023-01-20T10:04Z',
        status: 'resolved',
        totalComments: 8,
        commenters: [
          {
            id: 10,
            name: 'Emily Selman',
            imageUrl:
              'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 11,
            name: 'Kristin Watson',
            imageUrl:
              'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        ]
      },
      {
        id: 202,
        title: 'Phòng 202',
        typeRoom: 6,
        members: 4,
        date: 'Cả năm (2022 - 2023)',
        dateTime: '2023-01-20T20:12Z',
        status: 'active',
        totalComments: 15,
        commenters: [
          {
            id: 11,
            name: 'Kristin Watson',
            imageUrl:
              'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 6,
            name: 'Tom Cook',
            imageUrl:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 10,
            name: 'Emily Selman',
            imageUrl:
              'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          },
          {
            id: 16,
            name: 'Benjamin Russel',
            imageUrl:
              'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          }
        ]
      }
    ]
  }
];
