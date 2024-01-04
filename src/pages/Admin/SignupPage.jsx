import { useMutation, useQuery } from '@tanstack/react-query';
import { getAllRooms, getRoom, updateRoom } from 'API/room';
import { createStudentAccount, createStudentInformation } from 'API/user';
import { Select, Steps } from 'antd';
import ProfileForm from 'components/Form/ProfileForm';
import { GlobalContextProvider } from 'context/GlobalContext';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignupPage = () => {
  const { profileData } = useContext(GlobalContextProvider);
  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const [options, setOptions] = useState([]);

  const [informationData, setInformationData] = useState({});
  const [dob, setDob] = useState('');
  const [room, setRoom] = useState();

  const { data: roomsData, isSuccess } = useQuery({
    queryKey: ['rooms'],
    queryFn: getAllRooms,
    staleTime: 5000
  });

  const { data: RoomData, refetch } = useQuery({
    queryKey: ['detail_room'],
    queryFn: () => getRoom(room),
    enabled: !!room
  });

  useEffect(() => {
    refetch();
  }, [room]);

  useEffect(() => {
    if (isSuccess) {
      const newArray = roomsData.map((room) => ({
        value: room._id,
        label: room.Title
      }));

      setOptions(newArray);
    }
  }, [isSuccess]);

  const handleChange = (value) => {
    setRoom(value);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const createAccountStudent = useMutation({
    mutationFn: createStudentAccount,

    onSuccess: (res) => {
      createAccountInformation.mutate({
        ...informationData,
        Matk: res.id,
        DateOfBirth: moment(dob, 'DD/MM/YYYY').toDate(),
        Room: [room]
      });
    }
  });

  const createAccountInformation = useMutation({
    mutationFn: createStudentInformation,
    onSuccess: (res) => {
      updateSelectedRoom.mutate({
        id: room,
        CMND: profileData.CMND,
        data: [
          ...RoomData?.RoomNumbers,
          {
            _id: res?.Matk,
            number: RoomData.length + 1,
            unavailableDates: moment().add(6, 'months').toDate()
          }
        ]
      });
    }
  });

  const handleRegister = () => {
    if (RoomData) {
      createAccountStudent.mutate({
        CMND: informationData?.CMND,
        MatKhau: 'Password@123',
        RoleId: process.env.REACT_APP_STUDENT_ROLE_ID
      });
    }
  };

  const steps = [
    {
      title: 'Thông tin cá nhân',
      content: <ProfileForm next={next} isSignUp setInformationData={setInformationData} setDob={setDob} />
    },
    {
      title: 'Phòng',
      content: (
        <div className="bg-white rounded-md">
          <div className="flex flex-col justify-center items-center p-16">
            <div>
              <div>Phòng</div> <br />
              <Select
                style={{
                  width: 120
                }}
                onChange={handleChange}
                options={options}
              />
            </div>
          </div>
          <div className="flex justify-end w-full px-8 py-4 gap-4">
            <button className=" bg-red-500 p-3 px-6 text-white rounded-xl" onClick={prev}>
              Quay lại
            </button>
            <button className=" bg-blue-500 p-3 px-6 text-white rounded-xl" onClick={handleRegister}>
              Gửi
            </button>
          </div>
        </div>
      )
    }
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const updateSelectedRoom = useMutation({
    mutationFn: updateRoom,
    onSuccess: () => {
      toast.success('Tạo tài khoản cho sinh viên thành công');
      navigate('/admin');
    }
  });

  return (
    <div className="px-16 py-8">
      <div className="border-b border-gray-200 pb-5">
        <h3 className="text-base font-semibold leading-6 text-gray-900">Đăng ký người dùng</h3>
      </div>
      <div className="mt-8">
        <Steps current={current} items={items} />
        <div>{steps[current].content}</div>
      </div>
    </div>
  );
};

export default SignupPage;
