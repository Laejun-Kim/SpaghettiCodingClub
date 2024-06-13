'use client';

import { Button, Spacer } from '@nextui-org/react';

import Link from 'next/link';
import { useTrackStore } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { getTrackNotices } from '@/apis/trackNotice';
import { noticeData } from '@/types/types';

const NoticePage = () => {
  const { selectedTrack } = useTrackStore((state) => state);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trackNotices'],
    queryFn: () => getTrackNotices(selectedTrack!.trackId),
    enabled: !!selectedTrack,
    select: (data) => data.payload,
  });

  if (isLoading) {
    return <>로딩중</>;
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
