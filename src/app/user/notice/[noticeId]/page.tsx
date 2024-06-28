'use client';

import { getTrackNotice } from '@/apis/trackNotice';
import { useTrackStore } from '@/zustand/store';
import { Spacer } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

const NoticeDetailPage = () => {
  const { selectedTrack } = useTrackStore((state) => state);
  const params = useParams();
  const { noticeId } = params;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['trackNotice'],
    queryFn: () => getTrackNotice(selectedTrack!.trackId, +noticeId),
    enabled: !!noticeId,
    select: (data) => data.payload,
  });
  console.log(data);

  useEffect(() => {
    refetch();
  }, [noticeId, refetch]);

  if (isLoading) {
    return <>로딩중</>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>{data.trackNoticeTitle}</h1>
      <Spacer y={2} />
      <p className='whitespace-pre-line'>{data.trackNoticeContent}</p>
    </div>
  );
};

export default NoticeDetailPage;
