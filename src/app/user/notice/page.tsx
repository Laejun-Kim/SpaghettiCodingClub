'use client';

import { Spacer } from '@nextui-org/react';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getTrackNotices } from '@/apis/trackNotice';
import { noticeData } from '@/types/types';
import { getLoggedInUserData } from '@/apis/auth';

const NoticePage = () => {
  const { data: loggedInUserData } = useQuery({
    queryKey: ['loggedInUser'],
    queryFn: getLoggedInUserData,
    staleTime: 0,
  });

  const loggedInUserTrackId = loggedInUserData?.payload?.trackId;

  const { data, isLoading } = useQuery({
    queryKey: ['trackNotices'],
    queryFn: () => getTrackNotices(loggedInUserTrackId),
    enabled: !!loggedInUserTrackId,
    select: (data) => data.payload,
  });

  if (isLoading) {
    return <>로딩중</>;
  }
  if (data === undefined) {
    return <div>공지사항이 없습니다.</div>;
  }

  return (
    <div>
      <ul>
        {data.map((notice: noticeData) => {
          return (
            <li className='flex justify-between ' key={notice.noticeId}>
              <Link href={`/user/notice/${notice.noticeId}`}>
                {notice.trackNoticeTitle}
              </Link>
            </li>
          );
        })}
      </ul>
      <Spacer y={2} />
    </div>
  );
};

export default NoticePage;
