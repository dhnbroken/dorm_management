import { useParams } from 'react-router-dom';
import ProfileCard from 'components/ProfileCard';
import { useQuery } from '@tanstack/react-query';
import { getRoom } from 'API/room';

const people = [
  {
    id: 1,
    name: 'Lộc gà',
    university: 'Trường đại học Công Nghệ Thông Tin',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    citizenId: '213123123',
    studentId: '19521952'
  },
  {
    id: 2,
    name: 'Nam dep trai',
    university: 'Trường đời',
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    citizenId: '213123123',
    studentId: '19521953'
  },
  {
    id: 3,
    name: 'Lộc gà',
    university: 'Trường đại học Công Nghệ Thông Tin',
    imageUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    citizenId: '213123123',
    studentId: '19521952'
  },
  {
    id: 4,
    name: 'Nam dep trai',
    university: 'Trường đời',
    imageUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    citizenId: '213123123',
    studentId: '19521953'
  }
];

export default function RoomDetailPage() {
  const { id } = useParams();

  const { data: roomDetail } = useQuery({
    queryKey: ['room_detail'],
    queryFn: () => getRoom(id)
  });

  return (
    <div className="p-8">
      <div className="mx-auto max-w-2xl sm:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{roomDetail?.Title}</h2>
        <p className="my-2 text-lg leading-8 text-gray-600">Danh sách sinh viên</p>
      </div>

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {people.map((person) => (
          <li
            key={person.id}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <ProfileCard person={person} />
          </li>
        ))}
      </ul>
    </div>
  );
}
