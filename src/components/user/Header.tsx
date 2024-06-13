'use client';
import Image from 'next/image';
import React from 'react';
import logo from '@/assets/images/spaghetti_logo.png';
import Link from 'next/link';
import { logout } from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/zustand/store';

const Header = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useAuthStore();
  const HandleLogout = () => {
    logout();
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') router.replace('/');
  };
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
            <Link href={'/user/notice'}>공지게시판</Link>
          </li>
          <li>
            <Link href={'/user/schedule'}>팀 일정</Link>
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
