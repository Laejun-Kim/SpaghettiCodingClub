'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { currentUserData } from '@/types/types';
import { deleteUser, getLoggedInUserData, updatePassword } from '@/apis/auth';
import { Button, Chip } from '@nextui-org/react';
import Modal from '@/components/ui/Modal';
import UpdatePassword from '@/components/ui/UpdatePassword';

const MyPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { data } = useQuery({
    queryKey: ['loggedInUser'],
    queryFn: getLoggedInUserData,
    select: (data) => data.payload as currentUserData,
    staleTime: 0,
  });
  console.log(data);

  const unregisterHandler = () => {
    const password = prompt('비밀번호를 입력해주세요');
    if (password) {
      deleteUser(password);
    }
  };

  const updatePasswordHandler = () => {
    setShowModal(true);
  };

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <>
      {showModal && (
        <Modal title='비밀번호 변경' setIsOpen={setShowModal}>
          <UpdatePassword userId={data!.userId} setmodal={setShowModal} />
        </Modal>
      )}
      <div>
        <div className='flex items-center gap-2'>
          <h1 className='text-2xl font-bold'>{data?.username}</h1>
          <Chip
            variant='bordered'
            size='sm'
            color={data?.role === 'USER' ? 'primary' : 'danger'}
          >
            {data?.role}
          </Chip>
        </div>
        <span>{data?.trackName}</span>
        <div className='flex gap-2'>
          <p>이메일 : {data?.email}</p>
          <span className='cursor-pointer'>✏️</span>
        </div>
        <Button onClick={unregisterHandler}>회원탈퇴</Button>
        <Button onClick={updatePasswordHandler}>비밀번호 변경</Button>
      </div>
    </>
  );
};
export default MyPage;
