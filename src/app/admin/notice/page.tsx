'use client';

import { Button, Spacer } from '@nextui-org/react';
import TrackSelector from '@/components/admin/TrackSelector';

import Link from 'next/link';
import { useTrackStore } from '@/zustand/store';
import { useQuery } from '@tanstack/react-query';
import { getTrackNotices } from '@/apis/trackNotice';
import { noticeData } from '@/types/types';

const Notice = () => {
  const { selectedTrack } = useTrackStore((state) => state);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trackNotices'],
    queryFn: () => getTrackNotices(selectedTrack!.trackId),
    enabled: !!selectedTrack,
    select: (data) => data.payload,
  });
  console.log(data);

  if (isLoading) {
    return <>로딩중</>;
  }

  return (
    <div>
      <div className='flex gap-2'>
        <TrackSelector />
        <Button onClick={() => refetch()}>조회</Button>
      </div>
      <Spacer y={2} />
      <ul>
        {data.map((notice: noticeData) => {
          return (
            <li className='flex justify-between ' key={notice.noticeId}>
              <Link href={`/admin/notice/${notice.noticeId}`}>
                {notice.trackNoticeTitle}
              </Link>
            </li>
          );
        })}
      </ul>
      <Spacer y={2} />
      <Link href={'/admin/notice/write'}>
        <Button color='warning'>글쓰기</Button>
      </Link>
    </div>
  );
};

export default Notice;
