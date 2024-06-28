'use client';

import { useAuthStore } from '@/zustand/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  console.log('isloggedin', isLoggedIn);

  if (isLoggedIn && sessionStorage.getItem('token')) {
    router.replace('/redirect');
  } else {
    router.replace('/login');
  }

  return (
    <>
      <div>
        <h1 className='text-xl'>임시 바로가기</h1>
        <ul>
          <li>
            <Link href={'/login'}>로그인</Link>
          </li>
          <li>
            <Link href={'/register'}>회원가입</Link>
          </li>
          <li>
            <Link href={'/admin/student'}>관리자 홈</Link>
          </li>
          <li>
            <Link href={'/user'}>유저 홈</Link>
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
            <Link href={'/admin/track'}>트랙 관리 페이지</Link>
          </li>
          <li>
            <Link href={'/admin/schedule'}>일정 관리</Link>
          </li>
          <li>
            <Link href={'/admin/teambuilding'}>팀빌딩</Link>
          </li>
          <li>
            <Link href={'/user/mypage'}>유저 마이페이지</Link>
          </li>
          <li>
            <Link href={'/admin/mypage'}>어드민 마이페이지</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
