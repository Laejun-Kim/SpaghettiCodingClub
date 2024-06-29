'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/spaghetti_logo.png';
import logoutIcon from '@/assets/images/logoutIcon.svg';

import Link from 'next/link';
import { getLoggedInUserData, logout } from '@/apis/auth';
import { usePathname, useRouter } from 'next/navigation';

import { useAuthStore } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { currentUserRawData } from '@/types/types';
import { useWIPToast } from '@/hooks/useToast';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  // useWIPToast();

  const { data } = useQuery({
    queryKey: ['loggedInUser'],
    queryFn: getLoggedInUserData,
    select: (data: currentUserRawData) => data.payload,
  });

  const userName = data?.username;

  const { setIsLoggedIn } = useAuthStore();
  const HandleLogout = () => {
    logout();
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') router.replace('/');
  };

  const isActive = (path: string) => {
    return pathname.startsWith(path) ? 'text-lg text-myPointColor' : '';
  };

  return (
    <header className='flex flex-col justify-center items-center bg-peach w-[200px] min-w-[200px] min-h-screen p-6 fixed'>
      <div className='mb-8'>
        <Link href={'/'}>
          <Image src={logo} alt='logo' width={200} height={100} />
        </Link>
      </div>
      <div className='flex flex-col w-full justify-between items-center flex-1'>
        <ul className='flex flex-col items-center gap-2 font-bold'>
          <li className={isActive('/user/notice')}>
            <Link href={'/user/notice'}>공지게시판</Link>
          </li>
          {/* <li className={isActive('/user/schedule')}>
            <Link href={'/user/schedule'}>팀 일정</Link>
          </li> */}
          <li className={isActive('/user/schedule')}>
            <span className='cursor-pointer' onClick={useWIPToast}>
              팀 일정
            </span>
          </li>
        </ul>
        <div className='flex w-full items-center justify-around'>
          <Link href={'/user/mypage'}>
            <span>
              <strong>{userName}</strong> 님
            </span>
          </Link>

          <figure className='text-3xl cursor-pointer' onClick={HandleLogout}>
            <Image src={logoutIcon} alt='logo' width={25} height={35} />
          </figure>
        </div>
      </div>
    </header>
  );
};

export default Header;
