'use client';
import { getLoggedInUserData } from '@/apis/auth';
import { currentUserData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Spinner } from '@nextui-org/react';

const RedirectPage = () => {
  const router = useRouter();

  const {
    data: loggedInUser,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['loggedInUser'],
    queryFn: getLoggedInUserData,
    select: (data) => data.payload as currentUserData,
    staleTime: 0,
  });

  if (isFetching) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner size='lg' label='로딩중입니다' />
      </div>
    );
  }

  if (!isLoading && loggedInUser) {
    if (loggedInUser.role === 'ADMIN') {
      router.replace('/admin/student');
    } else {
      router.replace('/user');
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner size='lg' label='로그인중입니다' />
      </div>
    );
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <Spinner size='lg' label='이동중입니다' />
    </div>
  );
};

export default RedirectPage;
