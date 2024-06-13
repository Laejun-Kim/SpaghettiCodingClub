'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/spaghetti_logo.png';
import Link from 'next/link';
import { logout } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore, useRoleStore } from '@/zustand/store';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const Header = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore();
  const HandleLogout = () => {
    logout();
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') router.replace('/');
  };
  const queryClient = useQueryClient();
  const result = queryClient.getQueryData(['loggedInUser']);
  console.log('되나?', result);

  // 미들웨어 성공하면 이부분은 지우자!!
  const { role } = useRoleStore();
  console.log('role', role);
  if (role !== 'ADMIN') {
    if (typeof window !== 'undefined') router.replace('/');
  }

  return (
    <header className='flex flex-col justify-center items-center bg-slate-400 w-[200px] min-w-[200px] h-screen p-6'>
      <div className='mb-8'>
        <Link href={'/'}>
          {' '}
          <Image src={logo} alt='logo' width={200} height={100} />
        </Link>
      </div>
      <div className='flex flex-col justify-between items-end flex-1'>
        <ul className='flex flex-col items-center gap-2'>
          <li>
            <Link href={'/'}>팀 빌딩</Link>
          </li>
          <li>
            <Link href={'/admin/student'}>수강생 관리</Link>
          </li>
          <li>
            <Link href={'/admin/student/userId'}>수강생 상세</Link>
          </li>
          <li>
            <Link href={'/admin/track'}>트랙 관리</Link>
          </li>
          <li>
            <Link href={'/admin/trackweek'}>주차 관리</Link>
          </li>
          <li>
            <Link href={'/admin/notice'}>공지사항 관리</Link>
          </li>
          <li>
            <Link href={'/admin/schedule'}>일정 관리</Link>
          </li>
          <li>
            <Link href={'/admin/teambuilding'}>팀 빌딩</Link>
          </li>
        </ul>
        <div>
          <span className='text-3xl cursor-pointer' onClick={HandleLogout}>
            🚪
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
