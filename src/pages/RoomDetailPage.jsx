import { useParams } from 'react-router-dom';

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
  return (
    <div className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Phòng {id}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">Danh sách sinh viên</p>
        </div>
        <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:max-w-4xl lg:gap-x-8 xl:max-w-none">
          {people.map((person) => (
            <li key={person.id} className="flex flex-col gap-6 xl:flex-row">
              <img className="aspect-[4/5] w-52 flex-none rounded-2xl object-cover" src={person.imageUrl} alt="" />
              <div className="flex-auto">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{person.name}</h3>
                <p className="text-base leading-7 text-gray-600">{person.university}</p>
                <p className="mt-2 text-base leading-7 text-gray-600">MSSV: {person.citizenId}</p>
                <p className="text-base leading-7 text-gray-600">MSSV: {person.studentId}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
