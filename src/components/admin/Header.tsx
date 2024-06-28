'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/spaghetti_logo.png';
import logoutIcon from '@/assets/images/logoutIcon.svg';
import Link from 'next/link';
import { getLoggedInUserData, logout } from '@/apis/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { currentUserRawData } from '@/types/types';

const Header = () => {
  const pathname = usePathname();
  console.log(pathname);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setIsLoggedIn } = useAuthStore();

  const { data } = useQuery({
    queryKey: ['loggedInUser'],
    queryFn: getLoggedInUserData,
    select: (data: currentUserRawData) => data.payload,
    refetchOnMount: true,
  });

  const userName = data?.username;

  const HandleLogout = () => {
    logout();
    setIsLoggedIn(false);
    queryClient.removeQueries({ queryKey: ['loggedInUser'] });
    if (typeof window !== 'undefined') router.replace('/');
  };

  const role = data?.role;
  console.log(role);
  if (role && role !== 'ADMIN') {
    if (typeof window !== 'undefined') router.replace('/user/askadmin');
  }

  const isActive = (path: string) => {
    const matchExactOrWithSlash =
      pathname === path || pathname.startsWith(`${path}/`);
    return matchExactOrWithSlash ? 'text-lg text-myPointColor' : '';
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
          <li className={isActive('/admin/student')}>
            <Link href={'/admin/student'}>수강생 관리</Link>
          </li>

          <li className={isActive('/admin/track')}>
            <Link href={'/admin/track'}>트랙 관리</Link>
          </li>
          <li className={isActive('/admin/trackweek')}>
            <Link href={'/admin/trackweek'}>주차 관리</Link>
          </li>
          <li className={isActive('/admin/notice')}>
            <Link href={'/admin/notice'}>공지사항 관리</Link>
          </li>
          <li className={isActive('/admin/teambuilding')}>
            <Link href={'/admin/teambuilding'}>팀 빌딩</Link>
          </li>
        </ul>
        <div className='flex w-full items-center justify-around'>
          <Link href={'/admin/mypage'}>
            <span>
              <strong>{userName}</strong> 님
            </span>
          </Link>
          <figure
            className='text-3xl cursor-pointer text-myPointColor'
            onClick={HandleLogout}
          >
            <Image src={logoutIcon} alt='logo' width={25} height={35} />
          </figure>
        </div>
      </div>
    </header>
  );
};

export default Header;
